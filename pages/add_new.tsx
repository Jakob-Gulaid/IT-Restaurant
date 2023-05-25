import { useApp } from "@/components/useApp";
import { useEffect, useState } from "react";
import { Credentials } from "realm-web";
import * as Realm from "realm-web";

export default function Add() {
  const [navn, setNavn] = useState("");
  const [by, setBy] = useState("");
  const [adresse, setAdresse] = useState("");
  const [kjøkken, setKjøkken] = useState("");
  const [rating, setRating] = useState("");
  const [submit, setSubmit] = useState(false);

  const app = useApp();

  useEffect(() => {
    if (app && !app.currentUser) {
      const anonymousUser = Credentials.anonymous();
      app.logIn(anonymousUser);
    }
  }, [app, app?.currentUser]);

  useEffect(() => {
    if (app?.currentUser && submit) {
      if (adresse === "" || by === "" || navn === "" || kjøkken === "") {
        setSubmit(false);
        return;
      }
      const mongo = app?.currentUser?.mongoClient("mongodb-atlas");
      const restaurants = mongo
        .db("sample_restaurants")
        .collection("restaurants");

      restaurants.insertOne({
        borough: by,
        adress: adresse,
        name: navn,
        cuisine: kjøkken,
        rating: rating
      });
    }
  }, [submit]);

  return (
    <div className="bg-[url(https://media.cntraveler.com/photos/5bc8ec072383b345456ab323/16:9/w_4000,h_2250,c_limit/Prado__RC36688-EditRodrigo-Cardoso.jpg)] bg-cover bg-opacity-0 ">
      <div className="flex flex-col justify-between items-center h-20 w-screen bg-white outline">
        <div className="text-4xl font-light">Skriv din egen annmeldelse!</div>
        <div className=" text-lg font-thin">
          Bidra til nettsiden med en annmeldelse av en restaurant du har besøkt.
        </div>
      </div>
      <div className="flex justify-between">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-x-0 p-8 h-screen w-1/3 bg-white ">
          <AddInput
            innhold="Olivia"
            topptekst="Navn på restuarant"
            className={"w-full "}
            onChange={(e) => {
              setNavn(e.target.value);
            }}
          ></AddInput>
          <AddInput
            innhold="Oslo"
            topptekst="By"
            className={"w-full"}
            onChange={(e) => {
              setBy(e.target.value);
            }}
          ></AddInput>
          <AddInput
            innhold="Bergensgata 5"
            topptekst="Adresse"
            className={" w-full"}
            onChange={(e) => {
              setAdresse(e.target.value);
            }}
          ></AddInput>
          <AddInput
            innhold="italiensk, indisk, etc."
            topptekst="Kjøkken"
            className={"w-full"}
            onChange={(e) => {
              setKjøkken(e.target.value);
            }}
          ></AddInput>
          <div>
          </div>
          <div className="w-screen flex justify-center">
            <div className="bg-white w-1/3 flex justify-around h-16 absolute bottom-0 rounded-t-md items-center">
              <div>
              <div className="text-xs">Rating(frivillig)</div>
            <div className="rating rating-sm ">
              <input type="radio" name="star-1" className="mask mask-star bg-green-600 " />
              <input type="radio" name="star-1" className="mask mask-star bg-green-600" />
              <input type="radio" name="star-1" className="mask mask-star bg-green-600" />
              <input type="radio" name="star-1" className="mask mask-star bg-green-600" />
              <input type="radio" name="star-1" className="mask mask-star bg-green-600" />
            </div>
              </div>
              <button
                className="btn bg-green-600 border-green-600 hover:bg-green-400 hover:border-green-800 text-black font-medium"
                disabled={submit}
                onClick={() => {
                  setSubmit(true);
                }}
              >
                Send inn
              </button>
            </div>
          </div>
        </div>
        <div className=" "></div>
      </div>
    </div>
  );
}
function AddInput({
  innhold,
  topptekst,
  className,
  onChange,
}: {
  innhold: string;
  topptekst: string;
  className: string;
  onChange: (e: any) => void;
}) {
  return (
    <div>
      <label className="label">
        <span className="label-text">{topptekst}</span>
      </label>
      <input
        type="text"
        placeholder={innhold}
        className={className + " input"}
        onChange={onChange}
      />
    </div>
  );
}
