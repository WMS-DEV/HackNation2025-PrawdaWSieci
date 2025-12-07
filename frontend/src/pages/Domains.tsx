import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import BackIcon from "../assets/BackIcon.svg?react";

export default function Domains() {
    const navigate = useNavigate();

    const domains = [
        "gov.pl",
        "prawo.gov.pl",
        "edukacja.gov.pl",
        "zdrowie.gov.pl",
        "finanse.gov.pl",
        "bezpieczenstwo.gov.pl",
        "transport.gov.pl",
    ];

    const [query, setQuery] = useState("");

    const filteredDomains = useMemo(() => {
        const q = query.trim().toLowerCase();
        const collator = new Intl.Collator("pl", { sensitivity: "base" });
        const list = !q
            ? domains
            : domains.filter((d) => d.toLowerCase().includes(q));
        return [...list].sort((a, b) => collator.compare(a, b));
    }, [query, domains]);

    return (
        <div className="w-full h-screen flex flex-col justify-between bg-[var(--background-color)]">
            <div className="flex items-center justify-between p-4 pt-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-[#195598] font-bold text-lg"
                >
                    <BackIcon className="w-5 h-5 mr-1" />
                    Wróć
                </button>
                <h1 className="text-black font-bold text-lg">Domeny .gov.pl</h1>
                <div className="w-16"></div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-24">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-black mb-2 leading-tight">
                        Oficjalna lista wszystkich domen .gov.pl
                    </h2>
                    <p className="text-gray-500 text-sm px-4">
                        Poniższa lista zawiera wszystkie oficjalne domeny
                        rządowe, na których możesz bezpiecznie wprowadzać swoje
                        dane.
                    </p>
                </div>
                {/* a search bar and a list of domains from a server fetch */}
                <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center">
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Szukaj domeny..."
                            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <ul className="max-h-96 overflow-y-auto">
                            {filteredDomains.length === 0 ? (
                                <li className="p-3 text-gray-500">
                                    Brak wyników
                                </li>
                            ) : (
                                filteredDomains.map((domain) => (
                                    <li
                                        key={domain}
                                        className="p-3 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {domain}
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
