import React, { memo, useState, useEffect, useCallback } from 'react'
import icons from '../../ultils/icon'
import { useForm } from 'react-hook-form'
import InputForm from './components/InputForm'
import Selected from './components/Selected'
import { useSelector } from 'react-redux'
import EditorFrom from './components/EditorForm'
import { toast } from 'react-toastify'
import * as apis from '../../apis'
import { getBase64 } from '../../ultils/_helper'
import notImage from './image/notimage.jpg'
import Select from 'react-dropdown-select';


const { BsFillTrashFill, LuEye, IoIosCloseCircleOutline } = icons

const UpdateProduct = ({ editProduct, render }) => {

    const { register, formState: { errors }, reset, handleSubmit, watch } = useForm()


    const fetchMaterial = async () => {

        const response = await apis.apiGetMaterial()
        if (response.status) {
            setOptions(response.rs)
        }
    }

    // useState
    const [options, setOptions] = useState();
    const { category } = useSelector(state => state.app)
    const [valueOption, setValueOption] = useState([]);
    const [payload, setPayload] = useState({
        description: ''
    });

    const [invalidFields, setInvalidFields] = useState([]);
    const [preView, setPreView] = useState({
        thumbnail: [],
        image: []
    });
    const [hoverImage, setHoverImage] = useState(null);



    const changeValue = useCallback((e) => {
        setPayload(e)
    }, [payload])

    useEffect(() => {
        reset({ title: editProduct.title, price: editProduct.price, quantity: editProduct.quantity })
        setPayload({ description: editProduct.description })

        setPreView({
            thumbnail: editProduct?.thumbnail[0] || [],
            image: editProduct?.image || []
        })


        fetchMaterial()



    }, [editProduct]);

    useEffect(() => {

        const commonItems = options?.filter(item => editProduct?.material?.some(el => el.includes(item.title))) || [];
        const data = commonItems.map(item => ({ title: item.title, _id: item._id }))
        setValueOption(data)
    }, [render]);


    const onChangeMaterial = (data) => {
        setValueOption(data)



    }



    const handleUpdate = async (data) => {

        try {
            const finalPayload = { ...data, ...payload };

            console.log(finalPayload)
            const formData = new FormData();

            for (let i of Object.entries(finalPayload)) {
                formData.append(i[0], i[1]);
            }
            console.log('finalPayload.thumbnail', finalPayload.thumbnail)


            if (finalPayload.thumbnail?.length > 0) {
                if (finalPayload.thumbnail) {
                    formData.append('thumbnail', data.thumbnail.length === 0 ? preView.thumbnail : finalPayload.image[0]);
                }
            } else {
                formData.delete("thumbnail");
            }


            const images = finalPayload.image.length === 0 ? preView.image : finalPayload.image;
            if (finalPayload?.image?.length > 0) {
                for (const image of images) {
                    formData.append('image', image);
                }
            } else {
                formData.delete("image");
            }


            if (valueOption.length > 0) {
                for (const material of valueOption) {
                    formData.append('material', material.title)
                }
            }
            const response = await apis.apiUpdateProduct(formData, editProduct._id);

            if (response.success) {
                toast.success('Update sản phẩm thành công');
                setPreView({
                    thumbnail: '',
                    image: [],
                });
                setPayload({description:''})
                setValueOption([])
                reset()
                render()
            }
        } catch (error) {

            toast.error('Có lỗi xảy ra khi cập nhật sản phẩm');
        }
    };



    useEffect(() => {
        if (watch('thumbnail')) {
            handlePreViewImage(watch('thumbnail')[0])
        }

    }, [watch('thumbnail')]);


    useEffect(() => {
        if (watch('image')) {
            console.log('object')
            handlePreViewImageProduct(watch('image'))
        }

    }, [watch('image')]);

    const handlePreViewImage = async (file) => {
        if (!file) return
        const baseTo64 = await getBase64(file)
        setPreView(prev => ({ ...prev, thumbnail: baseTo64 }))


    }
    const handlePreViewImageProduct = async (files) => {
        if (!files) return
        const arrImage = []
        for (const file of files) {
            if (file?.type == 'image/png' || file?.type == 'image/jpg' || file?.type == 'image/jpeg') {
                const baseTo64 = await getBase64(file)
                arrImage.push(baseTo64)
            } else {
                toast.warning('File không hợp lệ a!')
                return
            }
        }
        if (arrImage?.length > 0) {
            setPreView(prev => ({ ...prev, image: arrImage }))
        }

    }
    return (
        <div className='p-4 flex flex-col '>
            <div className='flex justify-end '>
                <span onClick={() => render()} className='text-[#333] hover:text-main-100 cursor-pointer'>
                    <IoIosCloseCircleOutline size={25} />
                </span>
            </div>
            <div className='flex  w-full p-4 bg-white'>
                <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit(handleUpdate)} >
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
                    <div className='grid grid-cols-3 gap-4'>
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
                            defaultValue={editProduct?.category?.title}
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
                            labelField="title" valueField="_id"
                        />
                    </div>

                    {/* image */}
                    <div className='grid grid-cols-2 gap-4'>

                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-2 '>
                                <label htmlFor="thumbnail">Image Display</label>
                                <input type="file" id='thumbnail'
                                    {...register('thumbnail')}
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
                                    {...register('image')}
                                    multiple
                                />
                                {errors['image'] && <small className='text-xs text-red-500'>{errors['image']?.message}</small>}

                                {preView.image.length > 0 &&

                                    <div className='w-full flex items-center justify-center border rounded-md shadow-md gap-2 p-4'>
                                        {
                                            preView.image.map((item, idx) => (
                                                <div onMouseEnter={() => setHoverImage(item)} onMouseLeave={() => setHoverImage(null)} className='w-fit relative  '>
                                                    <img key={idx} className='w-[150px] h-[150px] object-contain' src={item} alt="image" />
                                                    {hoverImage == item &&
                                                        <div className='absolute flex items-center justify-center gap-2 animate-zoom inset-0 bg-hover'>
                                                            <div onClick={() => handleDelete(item)} className='text-white hover:text-main-100 cursor-pointer'>
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
                                value={editProduct?.description}
                            />
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='btn py-2 px-4 bg-green-600 text-white rounded-md text-lg'>Update Product</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default memo(UpdateProduct)
