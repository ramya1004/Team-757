// class PeerService {
//     constructor() {
//       if (!this.peer) {
//         this.peer = new RTCPeerConnection({
//           iceServers: [
//             {
//               urls: [
//                 "stun:stun.l.google.com:19302",
//                 "stun:global.stun.twilio.com:3478",
//               ],
//             },
//           ],
//         });
//       }
//     }
  
//     async getAnswer(offer) {
//       if (this.peer) {
//         await this.peer.setRemoteDescription(offer);
//         const ans = await this.peer.createAnswer();
//         await this.peer.setLocalDescription(new RTCSessionDescription(ans));
//         return ans;
//       }
//     }
  
//     async setLocalDescription(ans) {
//       if (this.peer) {
//         await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
//       }
//     }
  
//     async getOffer() {
//       if (this.peer) {
//         const offer = await this.peer.createOffer();
//         await this.peer.setLocalDescription(new RTCSessionDescription(offer));
//         return offer;
//       }
//     }
//   }
  
//   export default new PeerService();



class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });

      // Handle incoming tracks properly
      this.peer.ontrack = (event) => {
        if (event.streams && event.streams[0]) {
          this.remoteStream = event.streams[0];
        }
      };
    }
  }

  async getAnswer(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(offer));
      const ans = await this.peer.createAnswer();
      await this.peer.setLocalDescription(ans);
      return ans;
    }
  }

  async setLocalDescription(ans) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
    }
  }

  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(offer);
      return offer;
    }
  }

  addStream(stream) {
    stream.getTracks().forEach((track) => {
      this.peer.addTrack(track, stream);
    });
  }

  getRemoteStream() {
    return this.remoteStream || null;
  }
}

export default new PeerService();

  