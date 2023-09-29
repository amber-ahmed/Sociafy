import React, { useState } from 'react'
import menuIcon from '../../assets/icons8-three-dots-50.png'
import ReactShowMoreText from 'react-show-more-text'
import Alert from '../../layouts/Alert'
import EditPost from './EditPost'
const Home = () => {
  const [menu, setMenu] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [post, setPost] = useState('')
  const deletePost = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }
  const editPost = async () => {
    try {

    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Alert open={openAlert} setOpen={setOpenAlert} msg='Do you really want to delete this post' okText='Delete' cancelText='Cancel' okFun={deletePost} />
      <EditPost open={editModal} setOpen={setEditModal} post={post} setPost={setPost} editPost={editPost} />
      <div className='flex md:flex-row justify-normal flex-col'>
        <div className='md:w-1/4	'>
          <section
            style={{ fontFamily: "Montserrat" }}
            className=" bg-white  flex flex-col  font-medium items-center justify-top "
          >
            <section className="w-4/5 mx-8 mt-8 bg-cyan-500  rounded-2xl px-12 py-6 shadow-lg">

              <div className="mt-6 w-fit mx-auto">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                </div>
              </div>

              <div className=' text-center'>
                <div className="mt-8">
                  <h2 className="text-blue-700 font-bold text-2xl tracking-wide">
                    Jonathan <br /> Smith
                  </h2>
                </div>
                <h2 className="text-violet-500 font-semibold mt-2.5">amber@gmail.com</h2>
                <div className="mt-3 text-white text-sm">
                  <span className="text-black font-semibold">Last Post:</span>
                  <span className='text-gray-100'>20-4-2023</span>
                </div>
              </div>
            </section>
          </section>
        </div>



        <div className='w-full px-12'>

          <div className="block rounded-lg mt-8  w-full  bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="flex flex-row justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">

              <div className="">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">JL</span>
                </div>
              </div>
              <div className="dropdown dropdown-start" >
                <button onClick={() => setMenu(!menu)} type="button" class="text-cyan-500 border  hover:bg-cyan-500 hover:text-white  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
                  <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-three-dots-vertical">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                  <span class="sr-only">Icon description</span>
                </button>
                <ul tabIndex={0} className={`${menu ? 'hidden' : ''} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`}>
                  <li className='hover:bg-gray-200' onClick={() => setOpenAlert(!openAlert)}><button >Delete</button></li>
                  <li className='hover:bg-gray-200' onClick={() => setEditModal(!editModal)}><button  >Edit</button></li>
                </ul>
              </div>


            </div>
            <div className="p-6">
              <p className="mb-4 text-base text-left text-neutral-600 dark:text-neutral-200">
                <ReactShowMoreText
                  lines={8}
                  more="more"
                  less="less"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  expanded={false}
                  truncatedEndingComponent={"... "}
                >
                  {'hello this is my first post'}
                </ReactShowMoreText>            </p>
            </div>
            <div className="border-t-2 border-neutral-100  py-2 dark:border-neutral-600 dark:text-neutral-50">
              20-03-2023
            </div>
          </div>
        </div>

      </div>
    </>

  )
}

export default Home
