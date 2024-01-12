import React, { memo } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const EditorFrom = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {
    return (
        <div className='flex gap-2 flex-col w-full'>
            {label && <label htmlFor={label}>{label}</label>}
            <Editor
                apiKey='2h527c2i54f0rs6ruor00mqjvjdnw6t8we6c0jlpyoa5yegy'

                init={{
                    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                initialValue={value}
                onChange = {e => changeValue(prev => ({...prev, [name]:e.target.getContent()}))}
                onFocus = {()=> setInvalidFields && setInvalidFields([])}
            />

            {invalidFields?.some(el => el.name === name) && <small className='text-main-100  text-xs'>{invalidFields?.find(el => el.name)?.message}</small>}
        </div>
    );
}


export default memo(EditorFrom)