"use client"
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, Loader2Icon, Monitor, Smartphone, Sparkles, Square } from 'lucide-react'
import Image from 'next/image';
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
const sampleProduct = [
    'https://ai-product-image.vercel.app/headphone.png',
    'https://ai-product-image.vercel.app/juice-can.png',
    'https://ai-product-image.vercel.app/perfume2.png',
    'https://ai-product-image.vercel.app/burger.png',
    'https://ai-product-image.vercel.app/ice-creame.png'
]

const AvatarList = [
    {
        name: 'Avatar 1',
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
        name: 'Avatar 2',
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
        name: 'Avatar 3',
        imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
    },
    {
        name: 'Avatar 4',
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
    },
    {
        name: 'Avatar 5',
        imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
        name: 'Avatar 6',
        imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
    },

]

type Props = {
    onHandleInputChange: any,
    OnGenerate: any,
    loading: boolean,
    enableAvatar: boolean
}

function FormInput({ onHandleInputChange, OnGenerate, loading, enableAvatar }: Props) {

    const [preview, setPreview] = useState<string | null>()
    const [selectedAvatar, setSelectedAvatar] = useState<string>()
    const onFileSelect = (files: FileList | null) => {
        if (!files || files?.length == 0) return;
        const file = files[0];
        if (file.size > 5 * 1024 * 1024) {
            alert('File size greater than 5 MB')
            return;
        }
        onHandleInputChange('file', file);
        setPreview(URL.createObjectURL(file));

    }

    return (
        <div className='p-7 border rounded-2xl'>
            <div>
                <h2 className='font-semibold'>1. Upload Product Image</h2>
                <div>
                    <label htmlFor='imageUpload' className='mt-2 border-dashed border-2 rounded-xl
                    flex flex-col p-4 bg-zinc-800 items-center justify-center min-h-[200px] cursor-pointer'>
                        {!preview ? <div className='flex flex-col items-center gap-3'>
                            <ImagePlus className='h-8 w-8 opacity-40' />
                            <h2 className='text-xl'>Click here to upload Image</h2>
                            <p className='opacity-45'>Upload image upto 5MB</p>
                        </div>
                            : <Image src={preview} alt='preview' width={300} height={300}
                                className='w-full h-full max-h-[200px] object-contain 
                                rounded-lg'
                            />}
                    </label>
                    <input type='file' id="imageUpload" className='hidden' accept='image/*'
                        onChange={(event) => onFileSelect(event.target.files)}
                    />
                </div>
                {/* Sample Products  */}
                {!enableAvatar && <div>
                    <h2 className='opacity-40 text-center mt-3'>Select Sample product to try</h2>
                    <div className='flex gap-5 items-center flex-wrap'>
                        {sampleProduct.map((product, index) => (
                            <Image src={product} alt={product} width={100} height={100} key={index}
                                className='w-[60px] h-[60px] rounded-lg cursor-pointer hover:scale-105 transition-all'
                                onClick={() => {
                                    setPreview(product);
                                    onHandleInputChange('imageUrl', product)
                                }}
                            />
                        ))}
                    </div>
                </div>}


            </div>

            {enableAvatar && <div className='mt-8'>
                <h2 className='font-semibold'>Select Avatar</h2>
                <div className='grid grid-cols-4 gap-3 mt-2'>
                    {AvatarList.map((avatar, index) => (
                        <Image src={avatar.imageUrl} alt={avatar.name} width={200} height={200}
                            className={`rounded-lg h-[100px] w-[80px] cursor-pointer object-cover
                                ${avatar.name == selectedAvatar && 'border-2 border-primary'}
                                `} key={index}
                            onClick={() => { setSelectedAvatar(avatar.name); onHandleInputChange('avatar', avatar.imageUrl) }}
                        />
                    ))}
                </div>
            </div>}
            <div className='mt-8'>
                <h2 className='font-semibold'>2. Enter product description</h2>
                <Textarea placeholder='Tell me more about product and how you want to display'
                    className='min-h-[150px] mt-2 bg-zinc-800'
                    onChange={(event) => onHandleInputChange('description', event.target.value)}
                />
            </div>
            <div className='mt-8'>
                <h2 className='font-semibold'>3.Select Image Size</h2>
                <Select onValueChange={(value) => onHandleInputChange('size', value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Resolution" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1024x1024">
                            <div className='flex gap-2 items-center'>
                                <Square className='h-4 w-4' />
                                <span>1:1</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="1536x1024">
                            <div className='flex gap-2 items-center'>
                                <Monitor className='h-4 w-4' />
                                <span>16:9</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="1024x1536">
                            <div className='flex gap-2 items-center'>
                                <Smartphone className='h-4 w-4' />
                                <span>9:16</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                disabled={loading}
                className='mt-5 w-full' onClick={OnGenerate}>
                {loading ? <Loader2Icon className='animate-spin' /> : <Sparkles />}Generate </Button>
            <h2 className='mt-1 text-sm opacity-35 text-center'>5 Credit to Generate</h2>
        </div>
    )
}

export default FormInput