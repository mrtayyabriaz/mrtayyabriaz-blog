import React, { useCallback, useEffect, useState } from 'react'
import RTE from './RTE'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import service from '../appwrite/config';


export default function PostEditor({ post }) {

  const [error, seterror] = useState(false);
  const [posted, setPosted] = useState(false);

  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      slug: post?.slug || ''
    }
  });
  const navigate = useNavigate();
  const userData = useSelector(state => state.UserData);

  useEffect(() => {
      console.log('post:::', post)
      setValue("title", post?.title);
      slugTransform(post?.title || '')
      setValue("content", post?.content);
  }, [post])
  


  const onSubmit = async (data) => {


    //==================== Edit post ( START ) ==================
    if (post) {
      console.log('----- Editing Post -----');
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
              setPosted(true);
              setTimeout(() => {
                setPosted(false);
              }, 3000);
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
    // watch slug
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
        {
          posted &&
          <div
            role="alert"
            class="fixed top-9 z-10 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div class="flex items-start gap-4">
              <span class="text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div class="flex-1">
                <strong class="block font-medium text-gray-900 dark:text-white"> Posted Successfully </strong>

                <p class="mt-1 text-sm text-gray-700 dark:text-gray-200">
                  Post has been created successfully.
                </p>
              </div>

              <button
                onClick={() => setPosted(false)}
                class="text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
              >
                <span class="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-6 w-6"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title:{post?.title}
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
            {post ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
