    const piosenki = [
        "A Perfect Circle - Disillusioned",
        "Big Wild feat. Yuna - Empty Room (Sofi Tukker Remix)",
        "Busy P - Genie feat. Mayer Hawthorne",
        "DROELOE - Homebound",
        "Fakear - Song For Jo",
        "Jabberwocky  Fog (feat. Ana Zimmer)",
        "Melvv x MOONZz - Goodbye",
        "Naive New Beaters - Words Hurt",
        "Paul Damixie - Get Lost",
        "Phoenix - J-Boy",
        "Slightly Left of Centre - Naked",
        "Unlike Pluto - Sweet (feat. Mister Blonde)"
    ]

    function createPlaylist() {

        for (let i = 0; i < piosenki.length; i++) {
            let div = document.createElement("div");
            document.querySelector(".mp-playlist").appendChild(div);
            div.classList.add("mp-playlist-element")
            div.id = "el-" + i;
            div.setAttribute("data-value", "music/music" + i + ".mp3")
            div.innerHTML = piosenki[i];
        }
    }

    let musicTrack = "";
    detectClick(musicTrack);

    function detectClick() {
        const parentEl = document.querySelector(".mp-playlist");
        parentEl.addEventListener('click', function (e) {
            musicTrack = `${e.target.dataset.value}`;
            run();
            return musicTrack;
        });
    }

    function run() {
        runn(musicTrack);

        function runn(musicTrack) {
            var audio = document.getElementById("audio");
            audio.src = musicTrack;
            audio.setAttribute('crossorigin', 'anonymous');
            audio.play();
            var context = new AudioContext();
            var src = context.createMediaElementSource(audio);
            var analyser = context.createAnalyser();

            var canvas = document.getElementById("canvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            var ctx = canvas.getContext("2d");
            src.connect(analyser);
            analyser.connect(context.destination);
            analyser.fftSize = 256;
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            var WIDTH = canvas.width;
            var HEIGHT = canvas.height;
            var barWidth = (WIDTH / bufferLength) * 2.5;
            var barHeight;
            var x = 0;

            function renderFrame() {
                requestAnimationFrame(renderFrame);
                x = 0;
                analyser.getByteFrequencyData(dataArray);
                // kolor wypelienia canvasa
                ctx.fillStyle = "rgba(192, 192, 192, 0.067)";
                // context.fillRect(x,y,width,height) x-  koordy gorny-lewy naroznik ile w prawo (na minusie w lewo); y - gorny-lewy naroznik ile w dol (na minusie w gore)
                ctx.fillRect(0, 0, WIDTH, HEIGHT);
                for (var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];
                    var r = barHeight + (25 * (i / bufferLength));
                    var g = 250 * (i / bufferLength);
                    var b = 50;
                    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
                    x += barWidth + 1;
                }
            }
            audio.play();
            renderFrame();

        };
    };
    createPlaylist();