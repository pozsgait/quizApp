// ...importok, shuffle...

export default function LogoQuiz({ username, onFinish }) {
  // ...állapotok...
  const [startTimestamp, setStartTimestamp] = useState(Date.now());

  useEffect(() => {
    // Logók beolvasása után indítsuk az időt!
    axios.get("http://localhost:5000/api/logos")
      .then(res => {
        const shuffled = shuffle(res.data);
        setLogos(shuffled);
        setGuesses(Array(shuffled.length).fill(""));
        setStartTimestamp(Date.now()); // quiz indulásának időpontja
      });
  }, []);

  // ...gombok, beküldés...

  const handleFinish = async (e) => {
    e.preventDefault();
    // ...megoldás kiértékelés stb...
    const endTimestamp = Date.now();
    const durationSeconds = Math.round((endTimestamp - startTimestamp) / 1000); // időtartam mp-ben

    await axios.post("http://localhost:5000/api/result", {
      username,
      score: scoreVal,
      details,
      duration_seconds: durationSeconds
    });
    /* ...tovább... */
  };

  // ...stb...
}