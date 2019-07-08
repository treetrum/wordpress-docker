import Player from "@vimeo/player";
import config from "../constants/config";

class VideoPlayer {
    constructor(el) {
        this.el = el;
        this.posterEl = el.querySelector(".video-player__poster");
        this.playerEl = el.querySelector(".video-player__player");
        this.cta = el.querySelector(".video-player__cta");
        this.videoURL = el.dataset.videoUrl;
        this.player = null;
        this.loadPoster();
        this.attachHandlers();
        console.log(this);
    }

    getVimeoAPI = async path => {
        return fetch(`https://api.vimeo.com${path}`, {
            headers: { Authorization: `Bearer ${config.vimeoToken}` },
        }).then(res => res.json());
    };

    loadPoster = async () => {
        const json = await this.getVimeoAPI(`/videos?links=${this.videoURL}`);
        const images = json.data[0].pictures.sizes;
        const { index: largestIndex } = images.reduce(
            (total, current, index) => {
                if (current.width > total.size) {
                    return {
                        index,
                        size: current.width,
                    };
                }
                return total;
            },
            { index: 0, size: 0 },
        );
        const image = images[largestIndex];
        this.posterEl.style.backgroundImage = `url(${image.link})`;
        console.log("Biggest image", image);
    };

    attachHandlers = () => {
        this.cta.addEventListener("click", () => {
            console.log("PLAYING VIDEO");
            this.playVideo();
        });
    };

    playVideo = () => {
        this.player = new Player(this.playerEl, {
            url: this.videoURL,
        });
        this.player.play();
        this.player.on("play", () => {
            this.posterEl.style.backgroundImage = "none";
        });
    };
}

const els = document.querySelectorAll(".video-player");
els.forEach(el => {
    new VideoPlayer(el);
});
