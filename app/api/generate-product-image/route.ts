
// The following code is for a Next.js API route that handles product image generation using OpenAI.

// The code imports necessary libraries and Firebase configurations.
import { db } from "@/configs/firebaseConfig";
import { imagekit } from "@/lib/imagekit";
import { clientOpenAi } from "@/lib/openai";
import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// PROMPT is a constant string defining the prompt for generating a product showcase image.
const PROMPT = `Create a vibrant product showcase image featuring a uploaded image
in the center, surrounded by dynamic splashes of liquid or relevant material that complement the product.
 Use a clean, colorful background to make the product stand out. Include subtle elements related to the product's flavor,
  ingredients, or theme floating around to add context and visual interest. 
  Ensure the product is sharp and in focus, with motion and energy conveyed through the splash effects ,
 Also give me image to video prompt for same in JSON format: {textToImage:'',imageToVideo:''}. Do not add any raw text or comment, Just give Json
`

// AVATAR_PROMPT is a constant string defining the prompt for generating a product showcase image with an avatar.
const AVATAR_PROMPT = `Create a professional product showcase image 
featuring the uploaded avatar naturally holding
 the uploaded product image in their hands. Make 
 the product the clear focal point of the scene. 
 Use a clean, colorful background that highlights the product.
  Include subtle floating elements related to the product’s flavor, 
  ingredients, or theme for added context, if relevant. Ensure both the avatar and product are sharp, well-lit, and in focus, 
conveying a polished and professional look.Also give me image to video prompt for same 
   in JSON format: {textToImage:'',imageToVideo:''} Do not add any raw text or comment, Just give Json`

// POST is an asynchronous function that handles the POST request.
export async function POST(req: NextRequest) {
    // It parses the form data from the request.
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description');
    const size = formData?.get('size');
    const userEmail = formData?.get('userEmail');
    const avatar = formData?.get('avatar') as string;
    const imageUrl = formData?.get('imageUrl') as string


    // It queries the 'users' collection in Firebase to find the user document based on the email.
    const userRef = collection(db, 'users');
    const q = query(userRef, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0];
    const userInfo = userDoc.data();


    // A unique document ID is created, and a new document is set in the 'user-ads' collection with a 'pending' status.
    const docId = Date.now().toString();
    await setDoc(doc(db, 'user-ads', docId), {
        userEmail: userEmail,
        status: 'pending',
        description: description,
        size: size,
        docId: docId
    })

    try {
        // If an image URL is not provided, the uploaded file is converted to a base64 string and uploaded to ImageKit.
        let imageKitRef: any;
        if (!imageUrl) {
            const arrayBuffer = await file.arrayBuffer();
            const base64File = Buffer.from(arrayBuffer).toString('base64');

            imageKitRef = await imagekit.upload({
                file: base64File,
                fileName: Date.now() + ".png",
                isPublished: true
            });
        }



        // An API call is made to OpenAI's GPT-4.1-mini model to generate a text prompt for image creation,
        // using either AVATAR_PROMPT or PROMPT based on whether an avatar is present.
        const response = await clientOpenAi.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: avatar?.length > 2 ? AVATAR_PROMPT : PROMPT
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageUrl?.length > 0 ? imageUrl : imageKitRef.url
                            }
                        }
                    ]
                }
            ]
        });



        // The response text is parsed as JSON.
        let textOutput = response.choices[0]?.message?.content?.trim() || "";

        // Raw code fences are removed.
        textOutput = textOutput.replace("```json", '').replace('```', '').trim();
        let json = JSON.parse(textOutput);
        console.log("JSON", json)
        // Another API call is made to OpenAI for image generation,
        // using the prompt obtained from the previous step and the product and avatar images.
        //@ts-ignore
        const ImageResponse = await clientOpenAi.responses.create({
            model: 'gpt-4.1-mini',
            max_output_tokens: 500,
            input: [
                {
                    role: 'user',
                    content: [
                        //@ts-ignore
                        { type: 'input_text', text: json?.textToImage },
                        //@ts-ignore
                        { type: 'input_image', image_url: imageUrl?.length > 0 ? imageUrl : imageKitRef.url },
                        // Avatar image is included if available.
                        ...(avatar?.length > 2 ? [{ type: 'input_image', image_url: avatar }] : [])
                    ]
                }
            ],
            // A tool call for image generation is specified with a quality and size.
            tools: [{ type: 'image_generation', quality: 'low', size: size ?? 'auto' }]
        })
        console.log(ImageResponse.output);
        const imageData = ImageResponse.output?.
            // The image generation result is filtered and extracted.
            filter((item: any) => item.type === 'image_generation_call')
            .map((item: any) => item.result);

        // The first generated image (base64) is selected.
        const generatedImage = imageData[0];//base64 Image

        // The generated image is uploaded to ImageKit.
        const uploadResult = await imagekit.upload({
            file: `data:image/png;base64,${generatedImage}`,
            fileName: `generate-${Date.now()}.png`,
            isPublished: true
        })

        // The 'user-ads' document is updated with the final image URL, product image URL, 'completed' status, and the image-to-video prompt.
        await updateDoc(doc(db, 'user-ads', docId), {
            finalProductImageUrl: uploadResult?.url,
            productImageUrl: imageUrl?.length > 0 ? imageUrl : imageKitRef.url,
            status: 'completed',
            imageToVideoPrompt: json?.imageToVideo // Save Image to Video prompt
        })

        // The URL of the generated image is returned in the response.
        return NextResponse.json(uploadResult?.url);
    }
    // If an error occurs, the 'user-ads' document is deleted and an error response is returned.
    catch (e) {
        await deleteDoc(doc(db, 'user-ads', docId));
        console.log(e)
        return NextResponse.json({ error: 'Please Try Again' });

    }
}
