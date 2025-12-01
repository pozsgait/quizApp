-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 01. 20:59
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `quiz2`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `logos`
--

CREATE TABLE `logos` (
  `id` int(11) NOT NULL,
  `filename` varchar(32) NOT NULL,
  `solution` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `logos`
--

INSERT INTO `logos` (`id`, `filename`, `solution`) VALUES
(1, '1.png', 'Microsoft'),
(2, '2.png', 'Discord'),
(3, '3.png', 'Pinterest'),
(5, '4.png', 'Lego'),
(7, '5.png', 'IBM'),
(10, '6.png', 'Amazon'),
(11, '7.png', 'Facebook'),
(12, '8.png', 'Netflix');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `results`
--

CREATE TABLE `results` (
  `id` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `datetime` datetime NOT NULL,
  `score` int(11) NOT NULL,
  `details` text DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `results`
--

INSERT INTO `results` (`id`, `username`, `datetime`, `score`, `details`, `duration_seconds`) VALUES
(1, 'efdsf', '2025-12-01 19:51:54', 0, '[{\"logo_id\":2,\"answer\":\"wer\",\"correct\":false},{\"logo_id\":1,\"answer\":\"\",\"correct\":false}]', NULL),
(2, 'tesztCsapat', '2025-12-01 19:52:24', 0, '[{\"logo_id\":1,\"answer\":\"eeee\",\"correct\":false},{\"logo_id\":2,\"answer\":\"\",\"correct\":false}]', NULL),
(3, 'teszt222', '2025-12-01 19:55:44', 0, '[{\"logo_id\":1,\"answer\":\"hhgh\",\"correct\":false},{\"logo_id\":2,\"answer\":\"\",\"correct\":false}]', NULL),
(4, 'tttt', '2025-12-01 19:59:02', 0, '[{\"logo_id\":2,\"answer\":\"f\",\"correct\":false},{\"logo_id\":1,\"answer\":\"\",\"correct\":false}]', NULL),
(5, 'dsdsada', '2025-12-01 20:00:33', 0, '[{\"logo_id\":2,\"answer\":\"fdfd\",\"correct\":false},{\"logo_id\":1,\"answer\":\"fdfdfd\",\"correct\":false}]', NULL),
(6, 'rer', '2025-12-01 20:06:09', 4, '[{\"logo_id\":7,\"answer\":\"Valami\",\"correct\":false},{\"logo_id\":1,\"answer\":\"Microsoft\",\"correct\":true},{\"logo_id\":5,\"answer\":\"lego\",\"correct\":true},{\"logo_id\":3,\"answer\":\"d\",\"correct\":false},{\"logo_id\":11,\"answer\":\"dsds\",\"correct\":false},{\"logo_id\":2,\"answer\":\"Discord\",\"correct\":true},{\"logo_id\":12,\"answer\":\"netflix\",\"correct\":true},{\"logo_id\":10,\"answer\":\"amaton\",\"correct\":false}]', NULL);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `results`
--
ALTER TABLE `results`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
