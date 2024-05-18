import logo from '../assets/logo.png'
const Navbar = () => {
    return (
        <>
        <div className="w-full p-4 flex flex-row">
            <div className='w-[40vw] flex items-center'>
                <img src={logo} className='w-32'/>
                <p className='text-2xl font-semibold text-white font-mono '>P i x A i</p>
            </div>
        </div>
        </>
    )
}
export default Navbar;