import React, { useCallback, useEffect, useState } from 'react'
import RTE from './RTE'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';


export default function PostEditor({ post }) {

  const [error, seterror] = useState(false);

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.tile || '',
      content: post?.content || '',
      slug: post?.slug || ''
    }
  });
  const navigate = useNavigate();
  const userData = useSelector(state => state.UserData);

  const onSubmit = async (data) => {


    //==================== Edit post ( START ) ==================
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image[0]) : null;

      if (file) {
        service.deleteFile(post.featuredimage);
      }

      //============= update post data ( START ) ===================
      const dbpost = await service.updatePost(post.$id,
        {
          ...data,
          featuredimage: file ? file.$id : null,
        });
      //============= update post data  ( END )  ===================
      if (dbpost) {
        navigate(`/post/${post.$id}`);
      }
    }
    //==================== Edit post  ( END )  ==================

    //==================== Create Post ( START ) ================
    else {

      console.log('Data:', data);
      const file = data.featuredimage[0] ? service.uploadFile(data.featuredimage[0], data.slug)
        .then((file) => {

          if (file) {
            data.featuredimage = file.$id;
            // console.log('thefile:', thefile);

            console.log('file:', file);
            console.log('Data:', data);

            const dbpost = service.createPost(
              { ...data, userId: userData.$id }
            )
            if (dbpost) {
              navigate(`/post/${data.slug}`);
            }
          }
        })
        : null;
    }
    //==================== Create Post  ( END )  ================
  }

  //==================== slug ( START ) =======================
  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value.trim().toLowerCase().replace(/[^a-zA-Z/d]+/g, '-');
    return '';
  }, [])
  //==================== slug  ( END )  =======================

  useEffect(() => {
    console.log('posteditor::', post);
    const subscrription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title));
      }
    })
    return () => subscrription.unsubscribe();
  }, [watch, slugTransform, setValue])








  return (
    <> <div className="container">
      <div className="login-form mx-auto">
        <h1 className='text-xl font-bold ml-2 mb-3'>Create Post</h1>
        {error && <div className="ms-auto fw-bolder pointer" onClick={() => seterror(false)}>X</div>}
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title:
            <input type="text" name="title" {...register('title', {
              required: true,
              maxLength: 50,
            })} />
          </label>
          <label>
            Slug:
            <input type="text" name="slug" disabled={true}
              {...register('slug', { required: true, })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
          </label>
          <RTE label={'content: '} name={'content'} control={control} defaultvalue={getValues('content')} />
          <label>
            Image:
            <input accept="image/png, image/ jpg, image/jpeg, image/gif"
              type="file"
              name="featuredimage" {...register('featuredimage')} />
          </label>
          {post && <div>
            <img className='w-100' src={service.getFile(post.featuredimage)} alt={post.title} />
          </div>}
          <label>
            Status:
            <select name="status" {...register('status', { required: true })}>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </label>
          <button type="submit" className='mybtn mybtn rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>
            {post ? 'Create' : 'Update'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
