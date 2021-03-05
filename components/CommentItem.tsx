import { useState } from 'react'
import { Formik, Form } from 'formik'
import { DateTime } from 'luxon'

import {
  CommentFragment,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useMeQuery,
} from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { InputField } from './InputField'

interface CommentItemProps {
  comment: CommentFragment
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [commenting, setCommenting] = useState(false)

  const { data } = useMeQuery({ skip: isServer() })

  const [editComment] = useEditCommentMutation()
  const [deleteComment] = useDeleteCommentMutation()

  return (
    <div className='flex py-4'>
      <div className='w-10/12'>
        <div className='md:flex align-bottom'>
          <p className='mr-2 text-lg font-semibold'>{comment.author?.name}</p>
          <p className='hidden md:inline-block text-gray-400'>|</p>
          <p className='md:ml-2 text-gray-400'>
            {DateTime.fromISO(comment.createdAt).setLocale('en').toRelative()}
          </p>
        </div>
        {commenting ? (
          <Formik
            initialValues={{
              text: comment.text!,
            }}
            onSubmit={async ({ text }, { setErrors }) => {
              const response = await editComment({
                variables: { commentId: comment.id!, text },
              })

              if (response.errors) {
                console.log(response.errors)
                setErrors({ text: response.errors[0].message })
              }

              setCommenting(false)
            }}
          >
            {({ isSubmitting, resetForm }) => (
              <Form className='md:flex max-w-lg'>
                <InputField name='text' placeholder='comment...' type='text' />

                {isSubmitting ? (
                  <button className='self-center mx-28 mb-4 md:mx-auto md:mb-0 py-2 px-4 focus:bg-pink-600 focus:text-white focus:outline-none rounded-md text-pink-600 border border-pink-600 hover:scale-105 hover:bg-pink-600 hover:text-white active:bg-pink-900 active:border-pink-900'>
                    loading
                  </button>
                ) : (
                  <div>
                    <div>
                      <button type='submit'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='w-6 p-1 rounded-md bg-green-200 fill-current text-green-600 transform hover:scale-110'
                        >
                          <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                        </svg>
                      </button>
                    </div>
                    <div>
                      <button
                        type='button'
                        onClick={() => {
                          setCommenting(false)
                          resetForm({})
                        }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          className='w-6 p-1 rounded-md bg-red-200 fill-current text-red-600 transform hover:scale-110'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        ) : (
          <div className='ml-4 mt-2'>{comment.text}</div>
        )}
      </div>
      {data?.me?.id === comment.author?.id && !commenting ? (
        <div className='ml-auto'>
          <div className='mb-4'>
            <button type='button' onClick={() => setCommenting(true)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-6 p-1 rounded-md bg-pink-200 fill-current text-pink-600 transform hover:scale-110'
              >
                <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
              </svg>
            </button>
          </div>
          <div>
            <button
              type='button'
              onClick={async () => {
                const response = await deleteComment({
                  variables: { commentId: comment.id! },
                  update: (cache) => {
                    cache.evict({ id: 'Comment:' + comment.id! })
                  },
                })

                if (response.errors) {
                  console.log(response.errors)
                }
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                stroke='currentColor'
                fill='none'
                className='justify-self-end w-6 p-1 rounded-lg bg-red-100 stroke-current text-red-600 transform hover:scale-110'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
