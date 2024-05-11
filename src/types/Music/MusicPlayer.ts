import { AudioLibrary } from "./AudioLibrary"

export interface MusicPlayer {
    RepeatSong: boolean,
    PlaylistEntry: number,
    CurrentAudioTitle: string,
    CurrentAudioURL: string,
    AudioLibrary: AudioLibrary
}
