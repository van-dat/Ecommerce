import React, { useCallback, useEffect, useState } from 'react'
import InputForm from './components/InputForm'
import Selected from './components/Selected'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import * as apis from '../../apis'
import EditorFrom from './components/EditorForm'
import Select from 'react-dropdown-select';
import notImage from './image/notimage.jpg'
import { getBase64 } from '../../ultils/_helper'
import { toast } from 'react-toastify'
import icons from '../../ultils/icon'




const { BsFillTrashFill, LuEye } = icons
const CreateProduct = () => {
    const { category } = useSelector(state => state.app)
    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()

    const [payload, setPayload] = useState({
        description: ''
    });
    const [options, setOptions] = useState();
    const [valueOption, setValueOption] = useState([]);

    const [invalidFields, setInvalidFields] = useState([]);
    const [preView, setPreView] = useState({
        thumbnail: '',
        image: []
    });
    const [hoverImage, setHoverImage] = useState(null);


    const fetchMaterial = async () => {
        const response = await apis.apiGetMaterial()
        if (response.status) {
            setOptions(response.rs)
        }
    }



    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])



    const handleCreate = async (data) => {
        try {
            const finalPayload = { ...data, ...payload };
            const formData = new FormData();
            for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
            if (finalPayload.thumbnail) formData.append('thumbnail', finalPayload.image[0]);
            if (finalPayload.image) {
                for (const image of finalPayload.image) {
                    formData.append('image', image);
                }
            }


            if (valueOption.length > 0) {
                for (const material of valueOption) {
                    formData.append('material', material)
                }
            }
            const response = await apis.apiCreateProduct(formData);
            if (response.success) {
                toast.success('Thêm sản phẩm thành công')
                setPreView({
                    thumbnail: '',
                    image: []
                })
                reset();
                setValueOption([])
            }

        } catch (error) {
            console.error('Error:', error);

            toast.error('Error creating product');
        }


    }

    const handlePreViewImage = async (file) => {
        if (!file) return
        if (file?.type == 'image/png' || file?.type == 'image/jpg' || file?.type == 'image/jpeg') {
            const baseTo64 = await getBase64(file)
            setPreView(prev => ({ ...prev, thumbnail: baseTo64 }))
        } else {
            toast.warning('File không hợp lệ b!')
            return
        }

    }
    const handleDelete = (e) => {
        if (preView.image.some(el => el.name == e)) setPreView(prev => ({ ...prev, image: preView?.image?.filter(i => i.name != e) }))

    }

    const handlePreViewImageProduct = async (files) => {
        const arrImage = []
        for (const file of files) {
            if (file?.type == 'image/png' || file?.type == 'image/jpg' || file?.type == 'image/jpeg') {
                const baseTo64 = await getBase64(file)
                arrImage.push({ name: file.name, path: baseTo64 })
            } else {
                toast.warning('File không hợp lệ a!')
                return
            }
        }
        if (arrImage?.length > 0) {
            setPreView(prev => ({ ...prev, image: arrImage }))
        }

    }

    const onChangeMaterial = (data) => {
        setValueOption(data)
    }

    useEffect(() => {
        fetchMaterial()
    }, []);


    useEffect(() => {
        handlePreViewImage(watch('thumbnail')[0])
    }, [watch('thumbnail')]);


    useEffect(() => {
        handlePreViewImageProduct(watch('image'))
    }, [watch('image')]);


    return (
        <div className='flex flex-col '>
            <div className='p-4 mb-4 flex justify-between items-center  text-2xl font-semibold bg-white rounded-md'>
                <h6 className=' m-0 text-2xl text-[#333] uppercase'>Create User</h6>
            </div>
            <div className='flex  w-full p-4 bg-white'>
                <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit(handleCreate)} >
                    <InputForm
                        label='Tên sản phẩm'
                        register={register}
                        errors={errors}
                        id='title'
                        validate={{
                            required: 'Bạn cần nhập tên sản phẩm'
                        }}
                        fullWidth
                        placeholder='Tên sản phẩm'
                    />
                    {/* price */}
                    <div className='grid grid-cols-3 gap-4 '>
                        <InputForm
                            label='Giá'
                            register={register}
                            errors={errors}
                            id='price'
                            type='Number'
                            fullWidth
                            validate={{
                                required: 'Bạn cần nhập giá sản phẩm'
                            }}
                            placeholder='Giá sản phẩm'


                        />
                        <InputForm
                            label='Số lượng'
                            register={register}
                            errors={errors}
                            id='quantity'
                            type='Number'
                            fullWidth
                            validate={{
                                required: 'Bạn cần nhập số lượng sản phẩm',
                                min: 1
                            }}
                            placeholder='Số lượng sản phẩm'
                        />
                        {/* <InputForm
                            label='Chọn Size(min - max)'
                            register={register}
                            errors={errors}
                            id='size'
                            type='input'
                            fullWidth
                            validate={{
                                required: 'Bạn cần nhập số lượng Size'
                            }}
                            placeholder='Size min-max'
                        /> */}
                        <Selected
                            label='Thể loại sản phẩm'
                            register={register}
                            errors={errors}
                            id='category'
                            fullWidth
                            validate={{
                                required: 'Need fill this field',

                            }}
                            style='rounded-md'
                            options={category?.map(el => ({ value: el.title, code: el._id }))}
                            defaultValue='chọn loại sản phẩm'

                        />
                    </div>
                    {/* Material*/}
                    <div className='grid grid-cols-1 gap-2'>
                        <label htmlFor="Material">Material</label>
                        <Select
                            multi
                            values={valueOption}
                            options={options}
                            onChange={(values) => onChangeMaterial(values)}
                            labelField="title" valueField="title"
                        />
                    </div>
                    {/* image */}
                    <div className='grid grid-cols-2 gap-4'>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2 '>
                                <label htmlFor="thumbnail">Image Display</label>
                                <input type="file" id='thumbnail'
                                    {...register('thumbnail', { required: 'not fill' })}
                                />
                                {/* {errors['thumbnail'] && <small className='text-xs text-red-500'>{errors['thumbnail']?.message}</small>} */}


                                {preView.thumbnail &&
                                    <div className='w-full flex items-center justify-center border rounded-md shadow-md p-4'>
                                        <div className='w-fit relative'>
                                            <img src={preView?.thumbnail} alt="image " className='w-[150px] h-[150px] object-contain' />
                                            <div className='absolute inset-0 '>

                                            </div>
                                        </div>
                                    </div>
                                }
                                {!preView?.thumbnail &&

                                    <div className='w-full flex items-center justify-center border  rounded-md shadow-md'>
                                        <   img src={notImage} className='w-[100px] h-[100px] object-contain' alt="image" />
                                    </div>
                                }

                            </div>
                            <div className='flex flex-col gap-2 '>
                                <label htmlFor="image">Image Product</label>
                                <input type="file" id='image'
                                    {...register('image', { required: 'not fill' })}
                                    multiple
                                />
                                {errors['image'] && <small className='text-xs text-red-500'>{errors['image']?.message}</small>}

                                {preView.image.length > 0 &&

                                    <div className='w-full flex items-center justify-center border rounded-md shadow-md gap-2 p-4'>
                                        {
                                            preView.image.map((item, idx) => (
                                                <div onMouseEnter={() => setHoverImage(item.name)} onMouseLeave={() => setHoverImage(null)} className='w-fit relative  '>
                                                    <img key={idx} className='w-[150px] h-[150px] object-contain' src={item.path} alt="image" />
                                                    {hoverImage == item.name &&
                                                        <div className='absolute flex items-center justify-center gap-2 animate-zoom inset-0 bg-hover'>
                                                            <div onClick={() => handleDelete(item.name)} className='text-white hover:text-main-100 cursor-pointer'>
                                                                <BsFillTrashFill size={20} />
                                                            </div>
                                                            <div className='text-white hover:text-red-400  cursor-pointer'>
                                                                <LuEye size={20} />
                                                            </div>
                                                        </div>}

                                                </div>
                                            ))
                                        }
                                    </div>
                                }

                                {!preView.image.length > 0 &&
                                    <div className='w-full flex items-center justify-center border  rounded-md shadow-md'>
                                        <img src={notImage} className='w-[100px] h-[100px] object-contain' alt="image" />
                                    </div>
                                }
                            </div>
                        </div>

                        {/* editor */}
                        <div className='w-full'>
                            <EditorFrom
                                name='description'
                                changeValue={changeValue}
                                label='Mô tả'
                                invalidFields={invalidFields}
                                setInvalidFields={setInvalidFields}
                            />
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='btn py-2 px-4 bg-green-600 text-white rounded-md text-lg'>Create Product</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProduct
