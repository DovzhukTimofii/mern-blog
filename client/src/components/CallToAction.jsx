import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-bl-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">У вас э запитання до призидента студ. парламенту?</h2>
        <p className="text-gray-500 my-2">Звертайтеся сюди.</p>
        <Button href="https://t.me/nikolaok" gradientDuoTone="purpleToBlue" className="rounded-tl-xl rounded-bl-none">
          Телеграм чат
        </Button>    
      </div>
      <div className="p-7 rounded-2xl  flex-1">
        <img className="rounded-2xl" src="https://i.ytimg.com/vi/CHL0TBlHPnI/maxresdefault.jpg"/>
      </div>
    </div>
  )
}
