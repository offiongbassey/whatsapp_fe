import { Logo } from "../../../svg";

export default function WhatsapaHome() {
  return (
    <div className="h-full w-full invisible sm:visible dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
        {/* Container */}
        <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
            <span>
              <Logo />
            </span>
            {/* infos */}
            <div className="mt-1 text-center space-y-[12px]">
                <h1 className="text-[31px] dark:text-dark_text_4 font-extralight">Whatsapp Web</h1>
                <p className="text-sm dark:text-dark_text_3">
                  Send and receive messages without keeping your phone online. <br/>
                  Use Whatsapp on up to 4 linked devices and 1 phone at the same time.
                </p>
            </div>
        </div>
    </div>
  )
}
