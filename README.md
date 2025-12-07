# HackNation2025-PrawdaWSieci

Hej,
razem z zespołem stworzyliśmy rozwiązanie utrudniające cyberprzestępcom naciąganie ludzi na podstawione strony Internetowe (tzw. Phishing). Opiera się ono na wtyczce do przeglądarki (opartej na silniku chromium) która wyświetla na stronach o domenie .gov.pl przycisk do wygenerowania kodu QR, który należy zeskanować za pomocą aplikacji mobilnej mObywatel. Po zeskanowaniu w aplikacji wyświetli się informacja o tym czy strona jest bezpieczna.Dodatkowo wtyczka ostrzega użytkownika, gdy wszedł na stronę o domenie bardzo podobnej do .gov.pl.Aplikacja sprawdza czy strona jest w domenie .gov.pl oraz czy domena znajduje się na liście domen otrzymanych razem z warunkami zadania. Sprawdzany jest również połączenie po HTTPS oraz ważność certyfikatu SSL. Dodatkowo sprawdzamy czy klient wszedł na stronę o poprawnym - przypisanym do strony adresie IP (ważne przy DNS spoofingu).Naturalnie nie mieliśmy możliwości podpiąć aplikacji do mObywatela, stworzyliśmy więc aplikację webową bardzo do niego podobną. W celu przetestowania aplikacji polecamy:

1. zainstalować wtyczkę wg. instrukcji umieszczonej w README.md w repozytorium GitHub,
2. otworzyć link projektu na telefonie: wms-frontend.artedev.duckdns.org (imituje to aplikacje mobilną),
3. wejść na stronę: www.gov.pl - w celu sprawdzenia jak wygląda UX dla strony z pożądanej domeny .gov.pl
4. wejść na stronę www.gov.com która w naszym przykładzie imituje stronę z niepoprawną - potencjalnie phishingową.
5. wejść na stronę dane.gov.pl która w naszym przykładzie nie przechodzi próby walidacji kodem QR

Skład zespołu:

- Bartosz Miziała,
- Kacper Knapik,
- Marcel Dybek,
- Mieszko Czubiński

## Instalacja wtyczki
1. Wejdź na chrome://extensions/
2. Uruchom tryb dewelopera (prawy górny róg)
3. Kliknij na "Załaduj rozpakowane"
4. Wybierz folder z wtyczką w swoim systemie plików (extension)
5. Opcjonalnie: wyłącz tryb dewelopera
