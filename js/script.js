/*Script Songs
*/
// Via Vallen ---------------------------------------------------------------------------------------------------------
new Vue({
    el: "#app1",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Korban Janji",
                    artist: "Via Vallen - Korban Janji",
                    cover: "img/1-1.jpg",
                    source: "audio/Via Vallen - Korban Janji ( Guyon Waton ).mp3",
                    url: "https://www.youtube.com/watch?v=XZD-8E7GD2I",
                    favorited: false
                },
                {
                    name: "Sayang",
                    artist: "Via Vallen - Sayang",
                    cover: "img/1-2.jpg",
                    source: "audio/Via Vallen - Sayang (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=UtjFu8c_goE",
                    favorited: false
                },
                {
                    name: "Bojo Galak",
                    artist: "Via Vallen - Bojo Galak",
                    cover: "img/1-3.jpg",
                    source: "audio/Via Vallen - Bojo Galak (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=qQUp3_rbDBE",
                    favorited: false
                },
                {
                    name: "Bagaikan Langit dan Bumi",
                    artist: "Via Vallen - Bagaikan Langit dan Bumi",
                    cover: "img/1-4.jpg",
                    source: "audio/Via Vallen - Bagai Langit Dan Bumi .mp3",
                    url: "https://www.youtube.com/watch?v=9RbkxlpK4YY",
                    favorited: false
                },
                {
                    name: "Cinta Terlarang",
                    artist: "Via Vallen - Cinta Terlarang",
                    cover: "img/1-5.jpg",
                    source: "audio/Via Vallen - Cinta Terlarang _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=G9dh8JIuyx4",
                    favorited: false
                },
                {
                    name: "Konco Turu",
                    artist: "Via Vallen - Konco Turu",
                    cover: "img/1-6.png",
                    source: "audio/Via Vallen - Konco Turu _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=i-IQLh5AD7E",
                    favorited: false
                },
                {
                    name: "Mendung Tanpo Udan",
                    artist: "Via Vallen - Mendung Tanpo Udan",
                    cover: "img/1-7.jpg",
                    source: "audio/Mendung Tanpo Udan _ Via Vallen Feat New Pallapa Official ( Official Musik Video Terbaru 2021 ).mp3",
                    url: "https://www.youtube.com/watch?v=02SNCc3IkP4",
                    favorited: false
                },
                {
                    name: "Wegah Kelangan",
                    artist: "Via Vallen - Wegah kelangan",
                    cover: "img/1-8.jpg",
                    source: "audio/Via Vallen - Wegah Kelangan _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=vdNm9-Q_swk",
                    favorited: false
                },
                {
                    name: "Pikir Keri",
                    artist: "Via Vallen - Pikir keri",
                    cover: "img/1-9.jpg",
                    source: "audio/Via Vallen - Pikir Keri _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=1M_ymZiarSg",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});

// Denny Caknan---------------------------------------------------------------------------------------------------------
new Vue({
    el: "#app2",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Kartonyono Medot Janji",
                    artist: "DENNY CAKNAN - Kartonyono Medot Janji",
                    cover: "img/2-1.jpg",
                    source: "audio/Denny Caknan - Kartonyono Medot Janji (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=WlmWXoP0C0s",
                    favorited: false
                },
                {
                    name: "Gak Pernah Cukup",
                    artist: "DENNY CAKNAN - Gak Pernah Cukup",
                    cover: "img/2-2.jpg",
                    source: "audio/DENNY CAKNAN - GAK PERNAH CUKUP (OFFICIAL LIVE MUSIC).mp3",
                    url: "https://www.youtube.com/watch?v=-GGBuzjucNA",
                    favorited: false
                },
                {
                    name: "Tanpo Tresnamu",
                    artist: "DENNY CAKNAN - Tanpo Tresnamu",
                    cover: "img/2-3.jpg",
                    source: "audio/Denny Caknan - Tanpo Tresnamu (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=UZfF0fKKHsQ",
                    favorited: false
                },
                {
                    name: "Sugeng Dalu",
                    artist: "DENNY CAKNAN - Sugeng Dalu",
                    cover: "img/2-4.jpg",
                    source: "audio/Denny Caknan - Sugeng Dalu (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=W1e1ZZidrAg",
                    favorited: false
                },
                {
                    name: "Ojo Nangis",
                    artist: "Denny Caknan ft. Ndarboy Genk - Ojo Nangis",
                    cover: "img/2-5.jpg",
                    source: "audio/DENNY CAKNAN FT. NDARBOY GENK - OJO NANGIS (OFFICIAL LIVE MUSIC).mp3",
                    url: "https://www.youtube.com/watch?v=NoBzI8O34Nc",
                    favorited: false
                },
                {
                    name: "Sampe Tuwek",
                    artist: "DENNY CAKNAN - Sampe Tuwek",
                    cover: "img/2-6.jpg",
                    source: "audio/Denny Caknan - Sampe Tuwek (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=4Xyu95TEJZ0",
                    favorited: false
                },
                {
                    name: "SATRU",
                    artist: "Denny Caknan x Happy Asmara - SATRU",
                    cover: "img/2-7.jpg",
                    source: "audio/Denny Caknan X Happy Asmara - SATRU (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=fKVgm3_x-OI",
                    favorited: false
                },
                {
                    name: "SATRU 2",
                    artist: "DENNY CAKNAN - SATRU 2",
                    cover: "img/2-8.jpg",
                    source: "audio/Denny Caknan - SATRU 2 (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=8Md-VUivfis",
                    favorited: false
                },
                {
                    name: "Titipane Gusti",
                    artist: "Denny Caknan - Titipane Gusti",
                    cover: "img/2-9.jpg",
                    source: "audio/Denny Caknan - Titipane Gusti (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=CnSFLHlWwK0",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});

// GUYONWATON OFFICIAL-------------------------------------------------------------------------------------------------
new Vue({
    el: "#app3",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Menepi - Ngatmombilung",
                    artist: "GuyonWaton Cover",
                    cover: "img/3-1.jpeg",
                    source: "audio/MENEPI - GUYONWATON COVER [UNOFFICIAL LIRIK].mp3",
                    url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
                    favorited: false
                },
                {
                    name: "Klebus - Ngatmombilung",
                    artist: "GuyonWaton Cover",
                    cover: "img/3-2.jpg",
                    source: "audio/NGATMOMBILUNG - KLEBUS (GUYONWATON COVER).mp3",
                    url: "https://www.youtube.com/watch?v=Gz2bMo6WQUI",
                    favorited: false
                },
                {
                    name: "Perlahan",
                    artist: "GuyonWaton Official",
                    cover: "img/3-3.jpg",
                    source: "audio/GuyonWaton Official - Perlahan (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=IYNRADB6GP0",
                    favorited: false
                },
                {
                    name: "Kok iso yo?",
                    artist: "GuyonWaton Official",
                    cover: "img/3-4.jpg",
                    source: "audio/GuyonWaton Official - Kok Iso Yo_ (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=fIC9z4TZqR4",
                    favorited: false
                },
                {
                    name: "Sebatas Teman",
                    artist: "GuyonWaton Official",
                    cover: "img/3-5.jpg",
                    source: "audio/GUYONWATON OFFICIAL - SEBATAS TEMAN (OFFICIAL LYRIC VIDEO).mp3",
                    url: "https://www.youtube.com/watch?v=WdlptghSKTc",
                    favorited: false
                },
                {
                    name: "Kelangan",
                    artist: "GuyonWaton Official",
                    cover: "img/3-6.jpg",
                    source: "audio/GuyonWaton Official - Kelangan (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=tZHPXPKd2rM",
                    favorited: false
                },
                {
                    name: "Ora Masalah",
                    artist: "GuyonWaton Official",
                    cover: "img/3-7.jpg",
                    source: "audio/GuyonWaton Official - Ora Masalah (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=aI5b67FHsVs",
                    favorited: false
                },
                {
                    name: "Ninggal Cerito (Purwokerto)",
                    artist: "GuyonWaton Official",
                    cover: "img/3-8.jpg",
                    source: "audio/GuyonWaton Official - Ninggal Cerito (Purwokerto) _ Official Music Video.mp3",
                    url: "https://www.youtube.com/watch?v=UuVPleWWaEU",
                    favorited: false
                },
                {
                    name: "Lungaku",
                    artist: "GuyonWaton Official",
                    cover: "img/3-9.jpg",
                    source: "audio/GuyonWaton Official - Lungaku (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=vlCLWMfSnkI",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});

// Didi Kempot---------------------------------------------------------------------------------------------------------
new Vue({
    el: "#app4",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Banyu Langit",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-1.jpg",
                    source: "audio/Didi Kempot - Banyu Langit _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=20_CyA4CCTs",
                    favorited: false
                },
                {
                    name: "Ambyar",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-2.jpg",
                    source: "audio/Didi Kempot - Ambyar _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=pTgly-Ggisg",
                    favorited: false
                },
                {
                    name: "Cidro",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-3.jpg",
                    source: "audio/Didi Kempot - Cidro _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=0ADwyqBL5ds",
                    favorited: false
                },
                {
                    name: "Pamer Bojo",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-4.jpg",
                    source: "audio/Didi Kempot - Pamer Bojo _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=Xo9egupmgoE",
                    favorited: false
                },
                {
                    name: "Suket Teki",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-5.jpg",
                    source: "audio/Didi Kempot - Suket Teki _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=NBW7gaWSXuA",
                    favorited: false
                },
                {
                    name: "Sewu Kutho",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-6.jpg",
                    source: "audio/Via Vallen - Bojo Galak (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=zu5JmDj5SKE",
                    favorited: false
                },
                {
                    name: "Pantai Klayar",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-7.jpg",
                    source: "audio/Didi Kempot - Pantai Klayar _ Dangdut [OFFICIAL].mp3",
                    url: "https://www.youtube.com/watch?v=1jreJrQm6t4",
                    favorited: false
                },
                {
                    name: "Nelongso Ati",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-8.jpg",
                    source: "audio/Didi Kempot - Nelongso Ati (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
                    favorited: false
                },
                {
                    name: "Stasiun Balapan",
                    artist: "Didi Kempot | Dangdut Official",
                    cover: "img/4-9.jpg",
                    source: "audio/Didi Kempot - Stasiun Balapan (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=fcDSgupZQ2E",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});

// Happy Asmara -------------------------------------------------------------------------------------------------------
new Vue({
    el: "#app5",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "TAK IKHLASNO",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-1.jpg",
                    source: "audio/Happy Asmara - Tak Ikhlasno (Live Konser Pakeliran 2020).mp3",
                    url: "https://www.youtube.com/watch?v=yqkrTmlxLuM",
                    favorited: false
                },
                {
                    name: "BALIK KANAN WAE",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-2.jpg",
                    source: "audio/HAPPY ASMARA - BALIK KANAN WAE (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=Nt3qWVkvelw",
                    favorited: false
                },
                {
                    name: "OJO GETON",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-3.jpg",
                    source: "audio/HAPPY ASMARA - OJO GETON (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=9jHhCfMVPbE",
                    favorited: false
                },
                {
                    name: "SADAR DIRI",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-4.jpg",
                    source: "audio/HAPPY ASMARA - SADAR DIRI (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=NhG4wZZbSxo",
                    favorited: false
                },
                {
                    name: "Ajari Aku Membencimu",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-5.jpg",
                    source: "audio/Happy Asmara - Ajari Aku Membencimu _ Hanyaswara (Koplo Version).mp3",
                    url: "https://www.youtube.com/watch?v=f6uQ1R-EkEY",
                    favorited: false
                },
                {
                    name: "ATI SING LIYO",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-6.jpg",
                    source: "audio/HAPPY ASMARA - ATI SING LIYO (Official Live Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=86-cedupGAI",
                    favorited: false
                },
                {
                    name: "SAMPUN LILO",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-7.jpg",
                    source: "audio/HAPPY ASMARA - SAMPUN LILO (Official Live Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=RzL-24kKVGQ",
                    favorited: false
                },
                {
                    name: "Tanpo Aku",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-8.jpg",
                    source: "audio/HAPPY ASMARA - TANPO AKU (Sing Ati-Ati) [Official Live Music Video].mp3",
                    url: "https://www.youtube.com/watch?v=PplF5MWztPs",
                    favorited: false
                },
                {
                    name: "Klebus",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-9.jpg",
                    source: "audio/HAPPY ASMARA - KLEBUS (Official Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=H4PRCiILXig",
                    favorited: false
                },
                {
                    name: "Teteg Ati",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-10.jpg",
                    source: "audio/HAPPY ASMARA - TETEG ATI (Official Live Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=x1hXlwsORno",
                    favorited: false
                },
                {
                    name: "SEMATA KARENAMU",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-11.jpg",
                    source: "audio/HAPPY ASMARA - SEMATA KARENAMU (Official Live Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=0r_qR-wOjq0",
                    favorited: false
                },
                {
                    name: "EGO",
                    artist: "Happy Asmara Cover",
                    cover: "img/5-12.jpg",
                    source: "audio/HAPPY ASMARA - EGO (Official Live Music Video).mp3",
                    url: "https://www.youtube.com/watch?v=yxCkszva1A0",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});

// Revina Alvira Cover-------------------------------------------------------------------------------------------------
new Vue({
    el: "#app6",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Anak yang Malang",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-1.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - Anak Yang Malang.mp3",
                    url: "https://www.youtube.com/watch?v=Lct3WyBg_z4",
                    favorited: false
                },
                {
                    name: "Bagai Ranting yang Kering",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-2.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - Bagai Ranting Yang Kering.mp3",
                    url: "https://www.youtube.com/watch?v=kwQG_GH54e0",
                    favorited: false
                },
                {
                    name: "Buta (Roma Irama)",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-3.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - BUTA - (ROMA IRAMA).mp3",
                    url: "https://www.youtube.com/watch?v=XwNNfjrTxQ8",
                    favorited: false
                },
                {
                    name: "Dahsyat (Ebiem Ngesti)",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-4.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - DAHSYAT (Ebiem Ngesti).mp3",
                    url: "https://www.youtube.com/watch?v=GwSM2sTn-7Q",
                    favorited: false
                },
                {
                    name: "Mengejar Badai",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-5.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - MENGEJAR BADAI.mp3",
                    url: "https://www.youtube.com/watch?v=llRG_i8yFRQ",
                    favorited: false
                },
                {
                    name: "Payung Hitam",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-6.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - PAYUNG HITAM.mp3",
                    url: "https://www.youtube.com/watch?v=BRTiYIWQQZU",
                    favorited: false
                },
                {
                    name: "Pecah Seribu (Elvy S)",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-7.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - PECAH SERIBU (Elvy S).mp3",
                    url: "https://www.youtube.com/watch?v=0wcDsdA8dCk",
                    favorited: false
                },
                {
                    name: "Setetes Air Hina",
                    artist: "Revina Alvira | Dangdut Cover",
                    cover: "img/6-8.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) - Setetes Air Hina.mp3",
                    url: "https://www.youtube.com/watch?v=irfp6mhPK90",
                    favorited: false
                },
                {
                    name: "Runtah (Doel Sumbang)",
                    artist: "Revina Alvira ft. Nina | Dangdut Cover",
                    cover: "img/6-9.jpg",
                    source: "audio/Revina Alvira ( Dangdut Cover) & NINA - RUNTAH (Doel Sumbang).mp3",
                    url: "https://www.youtube.com/watch?v=NpUQv7S0Tdg",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});