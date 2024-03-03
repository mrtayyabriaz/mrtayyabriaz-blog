import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultvalue = '' }) {
  return (
    <>
      {label && <h3 className='w-100'>{label}</h3>}

      <Controller
        name={name || 'content'}
        control={control}
        defaultValue={defaultvalue}
        render={({ field: { onchange } }) => (
          <Editor
            initialValue={defaultvalue}
            apiKey='7kpbg9vbxv3z6rqzra0gax05ferdfgadrguhiose1wv2sjde'
            init={{
              height: 300,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat' 
            }}
            onEditorChange={onchange}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
            onInit={(evt, editor) => {
              console.log('Editor initialized', editor);
            }}
          />
        )}
      />
    </>
  )
}

export default RTE