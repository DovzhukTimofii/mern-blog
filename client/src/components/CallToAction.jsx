import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-bl-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">У вас э запитання до призидента студ. парламенту?</h2>
        <p className="text-gray-500 my-2">Звертайтеся сюди.</p>
        <Button gradientDuoTone="purpleToBlue" className="rounded-tl-xl rounded-bl-none">
            <a href="https://t.me/nikolaok" target="_blank" rel="noopener noreferrer">
                Телеграм чат
            </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src="https://i.ytimg.com/vi/CHL0TBlHPnI/maxresdefault.jpg"/>
      </div>
    </div>
  )
}
