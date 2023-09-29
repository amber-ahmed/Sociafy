import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactShowMoreText from 'react-show-more-text'
import Alert from '../../layouts/Alert'
import EditPost from './EditPost'
import { ValueContext } from '../../context'
import { api } from '../../api'
import Navbar from '../../layouts/Navbar'
const Home = () => {
  const [menu, setMenu] = useState(false)
  const {userDetails} = useContext(ValueContext)
  const [openAlert, setOpenAlert] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [postText, setPostText] = useState()
  const [userData, setUserData] = useState({ userId: '', username: '' })
  const searchEmail = useRef('')
  const [editPostText, setEditPostText] = useState('')
  const [reload, setReload] = useState(false)
  const [activePostId, setActivePostId] = useState('')
  const editPostHandler = async () => {
    try {
      const { data } = await api.put('/post/edit', {
        postId: activePostId,
        post: editPostText
      })
      console.log(data)
      setReload(!reload)
      setEditModal(!editModal)
    } catch (error) {
      console.log(error)
    }
  }
  const postHandler = async () => {
    try {
      const { data } = await api.post('/post/create', { post: postText })
      console.log(data)
      setReload(!reload)
    } catch (error) {
      console.log(error)
    }
  }
  const deletePostHandler = async () => {
    try {
      const { data } = await api.delete('/post/delete/' + activePostId)
      console.log(data)
      setReload(!reload)
      setOpenAlert(!openAlert)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/user/fetchuser')
        const { data: post } = await api.get('/post/fetchall/' + userDetails.userId)
        setUserData(data.userFound)
        setPosts(post.posts)
      } catch (error) {
        console.log(error)
      }
    }
    if (userDetails.userId)
      fetchPosts()
  }, [userDetails.userId, reload])

  const searchUser = async () => {
    try {
      const { data } = await api.get('/user/searchuser/' + searchEmail.current.value)
      const { data: post } = await api.get('/post/fetchall/' + data.userFound._id)
      console.log(post.posts)
      setPosts(post.posts)
      setUserData(data.userFound)
    } catch (error) {
      console.log(error)
    }
  }
  const getAvatar = (fullName) => {
    const nameParts = fullName.split(' ');
    if (nameParts.length <= 2) {
      const firstNameInitial = nameParts[0][0];
      const lastNameInitial = nameParts[nameParts.length - 1][0];
      let avatar = firstNameInitial
      if (nameParts.length === 2)
        avatar += lastNameInitial
      return avatar;
    } else {
      return 'Invalid';
    }
  }
  function formatDateString(dateString) {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = date.toLocaleDateString('en-IN', options);
    return formattedDate;
  }
  const editHandler = (post, postId) => {
    setActivePostId(postId)
    setEditPostText(post)
    setEditModal(!editModal)
  }

  const deleteHandler = (postId) => {
    setOpenAlert(!openAlert)
    setActivePostId(postId)
  }
  return (
    <>
      <Navbar />
      <Alert open={openAlert} setOpen={setOpenAlert} msg='Do you really want to delete this post' okText='Delete' cancelText='Cancel' okFun={deletePostHandler} />
      <EditPost open={editModal} setOpen={setEditModal} editPostText={editPostText} setEditPostText={setEditPostText} editPostHandler={editPostHandler} />

      <div className="relative mt-8 mx-4">

        <div className="absolute h-full pb-8 flex items-center pl-3 pointer-events-none">
          <svg
            className=" text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            width={30}
            height={30}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          ref={searchEmail}
          id="default-search"
          className="block w-full   p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-cyan-50 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
          placeholder="Search users"
          required=""
        />
        <button
          onClick={searchUser}
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-cyan-500 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Search
        </button>
      </div>

      <div className='flex md:flex-row justify-normal flex-col'>
        <div className='md:w-1/4	'>
          <section
            style={{ fontFamily: "Montserrat" }}
            className=" bg-white  flex flex-col  font-medium items-center justify-top "
          >
            <section className="w-4/5 mx-8 mt-8 bg-cyan-500  rounded-2xl px-2 py-6 shadow-lg">

              <div className="mt-6 w-fit mx-auto">
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <span className="font-medium text-gray-600 dark:text-gray-300">{getAvatar(userData.username)}</span>
                </div>
              </div>

              <div className='w-full text-center'>
                <div className="mt-8">
                  <h2 className="text-cyan-700 font-bold text-2xl tracking-wide">
                    {userData.username}
                  </h2>
                </div>
                <h2 className="text-violet-500 font-semibold mt-2.5">{userData.email}</h2>
                {/* <div className="mt-3 text-white text-sm">
                  <span className="text-black font-semibold">Last Post:</span>
                  <span className='text-gray-100'>{'20-04-2023'}</span>
                </div> */}
              </div>
            </section>
          </section>
        </div>



        <div className='w-full px-4'>
          {userDetails.userId === userData._id &&
            <div>
              <textarea onChange={(e) => setPostText(e.target.value)} id="post" rows="4" class="mt-8 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500" placeholder="Write your post here..."></textarea>

              <button
                onClick={postHandler}
                disabled={!postText}
                className="w-[80px] mt-4 text-white bg-cyan-500  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Post
              </button>
            </div>}


          {posts.map((post) => {
            return (
              <div className="block rounded-lg mt-8  w-full  bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <div className="flex flex-row justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">

                  <div className="">
                    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                      <span className="font-medium text-gray-600 dark:text-gray-300">{getAvatar(post?.user?.username)}</span>
                    </div>
                  </div>
                  {userDetails.userId === userData._id &&
                    <div className="dropdown dropdown-start" >
                      <button onClick={() => setMenu(!menu)} type="button" class="text-cyan-500 border  hover:bg-cyan-500 hover:text-white  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-cyan-500 dark:text-cyan-500 dark:hover:text-white dark:focus:ring-cyan-800 dark:hover:bg-cyan-500">
                        <svg width="25px" height="25px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="#000000" class="bi bi-three-dots-vertical">
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        </svg>
                        <span class="sr-only">Icon description</span>
                      </button>
                      <ul tabIndex={0} className={`${menu ? '' : 'hidden'} dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52`}>
                        <li className='hover:bg-gray-200' onClick={() => deleteHandler(post._id)}><button >Delete</button></li>
                        <li className='hover:bg-gray-200' onClick={() => editHandler(post.post, post._id)}><button  >Edit</button></li>
                      </ul>
                    </div>}


                </div>
                <div className="p-6">
                  <p className="mb-4 text-base text-left text-neutral-600 dark:text-neutral-200">
                    <ReactShowMoreText
                      lines={5}
                      more="more"
                      less="less"
                      className="content-css"
                      anchorClass="show-more-less-clickable"
                      expanded={false}
                      truncatedEndingComponent={"... "}
                    >
                      {post.post}
                    </ReactShowMoreText>            </p>
                </div>
                <div className="border-t-2 border-neutral-100  py-2 dark:border-neutral-600 dark:text-neutral-50">
                  {formatDateString(post.createdAt)}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </>

  )
}

export default Home
