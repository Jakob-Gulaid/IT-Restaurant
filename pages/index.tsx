import { useState } from "react";
import { useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import { useApp } from "../components/useApp";

export default function Home() {
  const [restauranter, setRestauranter] = useState<any[]>([]);
  const [visMer, setVisMer] = useState<number>(0)
  const [område, setOmråde] = useState<any>({$exists: true})
  const [navn, setNavn] = useState<any>({$exists: true})
  const [kjøkken, setKjøkken] = useState<any>({$exists: true})
  const [områdeE, setOmrådeE] = useState<string>("")
  const [navnE, setNavnE] = useState<string>("")
  const [kjøkkenE, setKjøkkenE] = useState<string>("")

  const app = useApp();

  useEffect(() => {
    if (!app?.currentUser) {
      return;
    }

    const mongo = app?.currentUser?.mongoClient("mongodb-atlas");
    const restaurants = mongo
      .db("sample_restaurants")
      .collection("restaurants");

    restaurants
      .find({ name: navn, borough: område, cuisine: kjøkken }, { limit: 10 + visMer, sort: {$natural:-1}} )

      .then((data) => {
        setRestauranter(data);
        console.log(data, "res");
      });
  }, [app?.currentUser, visMer, område, navn, kjøkken]);
  console.log(restauranter);

  return (
    <div>
      <div className="w-screen  justify-evenly h-16 bg-white items-center hidden lg:flex ">
        <div className="flex justify-between items-center gap-7">
        <div className=" ">søk etter:</div>
        <input id="sted" type="text" placeholder="område" className="shadow-lg h-12 rounded-xl p-3" value={områdeE}
         onChange={
          (e)=>{
            setOmrådeE(e.target.value)
            console.log(område)
            console.log(områdeE)
          }

        }/>
        </div> 
        <input id="restaurant" type="text" placeholder="restaurant" className="shadow-lg h-12 rounded-xl p-3" value={navnE}
         onChange={
          (e)=>{
            setNavnE(e.target.value)
          }

        } />
        <input id="mat" type="text" placeholder="kjøkken(engelsk)" className="shadow-lg h-12 rounded-xl p-3" value={kjøkkenE}
                onChange={
                  (e)=> {
                    setKjøkkenE(e.target.value)
        
                  }
                } 
  />
        <div className="flex justify-center gap-1">
        <button className="bg-green-700 outline-none rounded-md h-12 w-28 p-5 flex justify-center items-center font-semibold hover:bg-emerald-500 duration-200 text- text-opacity-35 text-gray-800" 
        onClick={ (e)=>{
          setKjøkken({$exists: true})
          setOmråde({$exists: true})
          setNavn({$exists: true})
          setNavnE("")
          setKjøkkenE("")
          setOmrådeE("")
        }

        }>Tøm søk</button>
        <button className="bg-green-700 outline-none rounded-md h-12 w-24 p-5 flex justify-center items-center font-semibold hover:bg-emerald-500 duration-200 text- text-opacity-75" onClick={
          ()=> {
            if(navnE == ""){
              setNavn({$exists: true})
            }
            if(navnE !== ""){
              setNavn(navnE)
            }
            if(områdeE == ""){
              setOmråde({$exists: true})
            }
            if(områdeE !== ""){
              setOmråde(områdeE)
              console.log(typeof(områdeE))
              console.log("hei")
            }
            if(kjøkkenE == ""){
              setKjøkken({$exists: true})
            }
            if(kjøkkenE !== ""){
              setKjøkken(kjøkkenE)
            }
          }
        }>Søk</button>
        </div>

      </div>
      <div className="w-screen  justify-center gap-8 h-16 bg-white items-center flex-col lg:hidden ">
        <div className="w-screen h-16 flex justify-center gap-y-9 items-center">
        <input id="sted" type="text" placeholder="område" className="shadow-lg h-12 rounded-xl p-3" value={områdeE}
         onChange={
          (e)=>{
            setOmrådeE(e.target.value)
            console.log(område)
            console.log(områdeE)
          }

        }/>

        <input id="restaurant" type="text" placeholder="restaurant" className="shadow-lg h-12 rounded-xl p-3" value={navnE}
         onChange={
          (e)=>{
            setNavnE(e.target.value)
          }

        } />
        <input id="mat" type="text" placeholder="kjøkken(engelsk)" className="shadow-lg h-12 rounded-xl p-3" value={kjøkkenE}
        onChange={
          (e)=> {
            setKjøkkenE(e.target.value)

          }
        }
  />
        </div>
        <div className="flex justify-center gap-7 w-screen h-16 bg-white mb-10">
        <button className="bg-green-700 outline-none rounded-md h-12 w-28 p-5 flex justify-center items-center font-semibold hover:bg-emerald-500 duration-200 text- text-opacity-35 text-gray-800" 
        onClick={ (e)=>{
          setKjøkken({$exists: true})
          setOmråde({$exists: true})
          setNavn({$exists: true})
          setNavnE("")
          setKjøkkenE("")
          setOmrådeE("")
        }

        }>Tøm søk</button>
        <button className="bg-green-700 outline-none rounded-md h-12 w-24 p-5 flex justify-center items-center font-semibold hover:bg-emerald-500 duration-200 text- text-opacity-75" onClick={
          ()=> {
            if(navnE == ""){
              setNavn({$exists: true})
            }
            if(navnE !== ""){
              setNavn(navnE)
            }
            if(områdeE == ""){
              setOmråde({$exists: true})
            }
            if(områdeE !== ""){
              setOmråde(områdeE)
              console.log(typeof(områdeE))
              console.log("hei")
            }
            if(kjøkkenE == ""){
              setKjøkken({$exists: true})
            }
            if(kjøkkenE !== ""){
              setKjøkken(kjøkkenE)
            }
          }
        }>Søk</button>
        </div>
      </div>
       <div className="grid grid-cols-2 items-center justify-center gap-y-8 mt-10 gap-10" onScroll={
        (e:any) => { 
          {
            const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
            if (bottom) { 
              console.log("hei")
            }
          }
        
        }
       }>
      {restauranter.map((restaurant) => (
        <div className=" card w-full shadow-2xl transition-all duration-200 mt-7">
           <div className="card-body">
          <h1 className="card-title"> Name: {restaurant.name}</h1>
          <div>Area: {restaurant.borough}</div>
          <div> Cuisine: {restaurant.cuisine}</div>
          <div> rating: {restaurant.rating}</div>
          </div>
        </div>
      ))}
      <div className="w-screen flex justify-center gap-x-16 mx-auto bottom-8 items-center mb-7">
      <button className="btn w-32 btn-primary" onClick={
        ()=> {
          if(visMer == 0){
            return
          }
          setVisMer(visMer-10)
        }
      }> vis mindre</button>
      <button className="btn w-32 btn-primary" onClick={
        ()=> {
          setVisMer(visMer+10)
        }
      }> last inn fler</button>
      </div>
    </div>
    </div>
   
  );
}

export function SidebarItem({ text, link }: { text: string; link: string }) {
  return (
    <li>
      <Link className="bg-red-600 m-2" href={link}>
        {" "}
        {text}
      </Link>
    </li>
  );
}
