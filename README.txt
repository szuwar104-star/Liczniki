LICZNIKI — PRĄD I WODA (PWA)

Wgraj CAŁĄ zawartość tego folderu do głównego katalogu witryny
(np. Netlify — przeciągnij folder na app.netlify.com/drop):

index.html
manifest.json
sw.js
icons/
  icon-192.png
  icon-512.png
  icon-512-maskable.png

Nie zmieniaj nazw plików ani struktury. PWA wymaga HTTPS (Netlify go zapewnia).
Na telefonie: otwórz adres w Chrome → Ustawienia w aplikacji → „Zainstaluj
aplikację” albo menu ⋮ → „Dodaj do ekranu głównego”. Na iPhonie: Safari →
Udostępnij → „Do ekranu początkowego”.

JAK LICZY
- Każde dwa kolejne odczyty tworzą okres. Zużycie z okresu jest rozkładane
  równo na każdy dzień (z dokładnością do godziny odczytu), więc odczyty co
  2, 5 czy 9 dni dają porównywalne średnie.
- Miesiące: gdy okres przechodzi przez granicę miesiąca, zużycie dzieli się
  proporcjonalnie do liczby dni. Bieżący miesiąc ma prognozę do końca
  (kreskowanie) liczoną z tempa z ostatnich 30 dni.
- „Szacunkowo dziś” na karcie licznika = ostatni stan + średnie tempo × dni
  od ostatniego odczytu.
- Wodę na dzień pokazuje w litrach, sumy w m³.
- „Wymiana licznika” w odczycie zaczyna liczenie od nowa — okres przed
  wymianą nie wchodzi do średnich. Odczyt niższy od poprzedniego bez tego
  znacznika jest pomijany w statystykach i oznaczony w historii na czerwono.
- Koszty pojawią się po wpisaniu ceny w Ustawieniach. Opłaty stałe (zł/mies.)
  są doliczane proporcjonalnie do liczby dni.

NOWE W WERSJI 2
- Limit miesięczny: pasek na karcie licznika (zużyte do dziś + prognoza),
  na czerwono, gdy prognoza przekroczy limit.
- Ostrzeżenie „X× więcej niż zwykle”, gdy ostatni okres wyraźnie odstaje.
- Test wycieku wody: dwa odczyty przy zakręconych kranach, wynik w l/h,
  l/dobę, m³ i zł na miesiąc. Oba odczyty trafiają do historii.
- Wykres miesięcy: dotknięcie słupka pokazuje szczegóły (koszt, limit,
  porównanie z tym samym miesiącem rok wcześniej). Tabela ma kolumnę r/r.
- Stan licznika na dowolny dzień i godzinę (przeprowadzka, zmiana taryfy).
- Udostępnij podsumowanie (udostępnianie systemowe albo schowek).
- Cofnij usunięcie odczytu, stronicowanie długiej historii.
- Motyw: jak w telefonie / jasny / ciemny.
- Plakietka z liczbą zaległych odczytów na ikonie zainstalowanej aplikacji
  (Android/Chrome, Windows, macOS).

DANE
- Odczyty są w pamięci przeglądarki (localStorage) tylko na tym urządzeniu.
  Ustawienia → „Zapisz kopię” tworzy plik JSON, „Wczytaj kopię” go przywraca
  (zastąpienie albo dołączenie do obecnych). Jest też eksport do CSV (Excel).
- Przytrzymanie ikony zainstalowanej aplikacji (Android) daje skróty
  „Odczyt prądu” / „Odczyt wody”.

AKTUALIZACJA
Strona główna jest pobierana najpierw z sieci, więc nowa wersja index.html
pojawi się po ponownym otwarciu aplikacji. Jeśli zmieniasz inne pliki
(ikony, manifest), podnieś CACHE w sw.js (np. "liczniki-v2").
