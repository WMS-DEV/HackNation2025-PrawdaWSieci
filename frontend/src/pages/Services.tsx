import Navigation from "../components/Navigation";
import MObywatelLogo from "../assets/mObywatelLogo.svg?react";
import Service from "../components/Service";

const dummyServices = [
    {
        text: "Zastrzeż PESEL",
        icon: (
            <img src="static/icon1.png" className="w-6" alt="Zastrzeż PESEL" />
        ),
    },
    {
        text: "Domeny gov.pl",
        icon: (
            <img src="static/icon2.png" className="w-6" alt="Domeny gov.pl" />
        ),
        url: "/domains",
    },
    {
        text: "Uprawnienia kierowcy",
        icon: <img src="static/icon4.png" className="w-6" alt="mojeIKP" />,
    },
    {
        text: "Hisotira pojazdu",
        icon: (
            <img
                src="static/icon5.png"
                className="w-6"
                alt="Zgłoś incydent w sieci"
            />
        ),
    },
    {
        text: "Sprawdź dowód",
        icon: (
            <img src="static/icon3.png" className="w-6" alt="Sprawdź dowód" />
        ),
    },
];

export default function Services() {
    return (
        <div className="w-full h-screen p-3 flex flex-col justify-between scroll-auto">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <MObywatelLogo className="w-10 h-10" />
                </div>
                <p className="font-extrabold text-3xl">Usługi</p>

                <p className="font-bold text-right text-[#2d85f1]">
                    Dostosuj widok
                </p>

                <p className="font-bold">Ulubione</p>
                <div className="flex flex-col gap-4">
                    {dummyServices.map((service, index) => (
                        <Service
                            key={index}
                            text={service.text}
                            icon={service.icon}
                            url={service.url}
                        />
                    ))}
                </div>
                <p className="font-bold">Ochrona danych</p>
                {dummyServices.map((service, index) => (
                    <Service
                        key={index}
                        text={service.text}
                        icon={service.icon}
                        url={service.url}
                    />
                ))}
                <p className="font-bold">Bezpieczeństwo</p>
                {dummyServices.map((service, index) => (
                    <Service
                        key={index}
                        text={service.text}
                        icon={service.icon}
                        url={service.url}
                    />
                ))}
            </div>
            <Navigation />
        </div>
    );
}
