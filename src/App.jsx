import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [char, setChar] = useState(false);
    const [paswrd, setPaswrd] = useState("");
    const paswrdRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUWXYZabcdefghijklmnopqrstuwxyz";
        if (number) str += "0123456789";
        if (char) str += "!@#$%^&*-";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }
        setPaswrd(pass)
    }, [length, number, char, setPaswrd])

    const copyPaswrd = useCallback(()=> {
        paswrdRef.current?.select();
        paswrdRef.current?.setSelectionRange(0, 100)
        window.navigator.clipboard.writeText(paswrd);
    }, [paswrd])

    useEffect(()=>{
        passwordGenerator()
    },[length, number, char, passwordGenerator])
    return (
        <>
            <div className='w-full max-w-md min-w-min mx-auto mt-28 shadow-md rounded-lg p-6 pb-6 text-orange-500 bg-gray-500'>
                <h1 className='text-3xl text-center text-white font-bold pb-2' >Password Generator</h1>
                <div className='flex shadow rounded-lg overflow-hidden'>
                    <input type="text"
                        value={paswrd}
                        className='outline-none w-full py-1 px-3'
                        placeholder='password'
                        readOnly
                        ref={paswrdRef}
                    />
                    <button onClick={passwordGenerator} className='bg-red-400 px-3 font-bold text-white'>Gen</button>
                    <button onClick={copyPaswrd} className='bg-blue-400 p-2 font-bold text-white'>Copy</button>
                </div>
                <div className='flex text-sm gap-x-2 pt-2'>
                    <div className='flex items-center gap-x-1'>
                        <input type="range"
                            min={6}
                            max={100}
                            value={length}
                            className='cursor-pointer'
                            onChange={(e) => { setLength(e.target.value) }}
                        />
                        <label>Length({length})</label>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input type="checkbox"
                            defaultChecked={number}
                            id='numberInput'
                            onChange={() => {
                                setNumber((prev) => !prev);
                            }}
                        />
                        <label htmlFor="numberInput">Numbers</label>    
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <input type="checkbox" 
                        defaultChecked={char}
                        id='characterInput'
                        onChange={() => {
                            setChar((prev) => !prev);
                        }}
                        />
                        <label htmlFor="characterInput">characters</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
