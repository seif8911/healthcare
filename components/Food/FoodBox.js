import React, { useState } from 'react'


const FoodBox = ({ name, bg, food, setFood, cal, setCal,sugar,setSugar, fibre, setFibre, protein,setProtein, carb,setCarb,fat ,setFat }) => {
    const [show, setShow] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-app-id": "11cb45f6",
                    "x-app-key": " e078585bda55a014914a3e777e5a5c56"
                },
                body: JSON.stringify({ query: food })
            })
            const data = await res.json()
            data?.foods?.map((x) => {
                setFat(Math.trunc(fat+=x["nf_total_fat"]))
                setCarb(Math.trunc(carb+=x["nf_total_carbohydrate"]))
                setFibre(Math.trunc(fibre+=x["nf_dietary_fiber"]))
                setProtein(Math.trunc(protein+=x["nf_protein"]))
                setCal(Math.trunc(cal+=x["nf_calories"]))
                setSugar(Math.trunc(sugar+=x["nf_sugars"]))
            })

            console.log({cal,protein,fibre,sugar,carb,fat})
            setFood("")
            setShow(false)

        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='foodbox relative pb-3 gap-2 text-white flex flex-col overflow-hidden cursor-pointer'>
            <img onClick={() => setShow(true)} src={bg} alt="background" className={`absolute h-full w-full  trans ${show ? "-top-[1000%]" : ""} inset-0 z-0`} />
            <div className={`absolute trans ${show ? "text-sm text-black" : "text-2xl"} top-2 left-3 `}>{name}</div>
            {show ? (
                <>
                    <input
                        value={food}
                        onChange={(e) => setFood(e.target.value)}
                        className='bg-white mt-auto px-3 rounded-lg p-1 h-10 text-black w-full'
                        placeholder='2 Eggs and Toast'
                    />
                    <div className="flex w-full gap-2">
                        <button onClick={handleSubmit} className="grow bg-green-500 rounded-lg">Submit</button>
                        <button onClick={() => setShow(false)} className="grow bg-red-500 rounded-lg">Close</button>
                    </div>
                </>
            ) : (
                <></>
            )}
            <p className={`absolute top-[50%] ${show ? "-top-[1000%]" : ""}  text-4xl font-bold left-[50%] translate-x-[-50%] translate-y-[-50%]`}>+</p>
        </div>
    )
}

export default FoodBox