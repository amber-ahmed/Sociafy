import * as React from 'react';
import homeIcon from '../assets/home-icon-silhouette-svgrepo-com.svg'
import { ValueContext } from '../context';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [menu, setMenu] = React.useState('')
    const {userDetails,setUserDetails} = React.useContext(ValueContext)
    const [openAlert, setOpenAlert] = React.useState(false)
    const navigate = useNavigate()
    const logOutHandler = () => {
        localStorage.removeItem('token')
        setUserDetails({})
        setOpenAlert(!openAlert)
        navigate('/', { replace: true })
    }
    return (
        <div>
            <Alert open={openAlert} setOpen={setOpenAlert} msg='Do you really want to Log Out' okText='Log Out' cancelText='Cancel' okFun={logOutHandler} />

            <nav class="bg-cyan-500 border-gray-200 dark:bg-gray-900">
                <div class="bg-cyan-500 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="/" class="flex items-center">
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sociafy</span>
                    </a>
                    <button onClick={() => setMenu(!menu)} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div class={`${menu ? 'hidden' : ''} bg-cyan-500 w-full md:block md:w-auto`} id="navbar-default">
                        <ul class="bg-cyan-500 font-medium   flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-bg-cyan-500  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {userDetails.logged && <>
                                <li>
                                    <a
                                        href="/home"
                                        className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                    >
                                        <img src={homeIcon} alt="home icon" width={30} height={30} />
                                    </a>
                                </li>
                                <li onClick={()=>setOpenAlert(!openAlert)}>
                                    <a href="#" class="block bg-cyan-500 py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-gray-100 hover:text-blue-700 md:hover:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Log Out</a>
                                </li></>}
                            {!userDetails.logged && <>
                                <li>
                                    <a href="/login" class="block bg-cyan-500 py-2 pl-3 pr-4 text-gray-900 rounded  hover:bg-gray-100 hover:text-blue-700 md:hover:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Log In</a>
                                </li>
                                <li>
                                    <a href="/register" class="block bg-cyan-500 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:text-blue-700 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                                </li></>}
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
}
