// ========================================
// DAILY CHALLENGE: VIDEO CLASS
// ========================================

// Exercise 1: Create Video Class

class Video {
    constructor(title, uploader, time) {
        this.title = title;
        this.uploader = uploader;
        this.time = time;
    }

    watch() {
        console.log(
            `${this.uploader} watched all ${this.time} of ${this.title}!`
        );
    }
}


// Exercise 2: First Video Instance

const video1 = new Video(
    "Learning JavaScript",
    "Amit",
    300
);

video1.watch();


// Exercise 3: Second Video Instance

const video2 = new Video(
    "Introduction to React",
    "Sarah",
    600
);

video2.watch();


// ========================================
// BONUS: Create 5 Videos from an Array
// ========================================

const videosData = [
    {
        title: "HTML Basics",
        uploader: "John",
        time: 180
    },
    {
        title: "CSS Flexbox",
        uploader: "Emma",
        time: 240
    },
    {
        title: "JavaScript Functions",
        uploader: "David",
        time: 360
    },
    {
        title: "React Components",
        uploader: "Amit",
        time: 420
    },
    {
        title: "Node.js Introduction",
        uploader: "Michael",
        time: 540
    }
];

// Create Video instances using a loop

const videos = [];

videosData.forEach(video => {
    const newVideo = new Video(
        video.title,
        video.uploader,
        video.time
    );

    videos.push(newVideo);
});

// Call watch() for each video

videos.forEach(video => {
    video.watch();
});