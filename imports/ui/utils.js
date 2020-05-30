import { Rooms, Players } from '../api/collections.js';
import { TAPi18n } from 'meteor/tap:i18n';

export const PRESIDENTIALPOWERS = {
  1: {
    id: 1,
    name: () => () => TAPi18n.__("Investigate Loyalty"),
    description: () => () => TAPi18n.__("President investigates a player's party membership_"),
    icon: "fa fa-user-secret"
  },
  2: {
    id: 2,
    name: () => TAPi18n.__("Policy Peek"),
    description: () => TAPi18n.__("President examines the top three cards_ Policy order doesn't change_"),
    icon: "fa fa-low-vision"
  },
  3: {
    id: 3,
    name: () => TAPi18n.__("Call Special Election"),
    description: () => TAPi18n.__("President picks the next Presidential Candidate_"),
    icon: "fa fa-street-view"
  },
  4: {
    id: 4,
    name: () => TAPi18n.__("Execution"),
    description: () => TAPi18n.__("President must kill a player_"),
    icon: "fa fa-bomb"
  },
  5: {
    id: 5,
    name: () => TAPi18n.__("Final Execution"),
    description: () => TAPi18n.__("President must kill a player_ Veto power is now unlocked_"),
    icon: "fa fa-rocket"
  },
  6: {
    id: 6,
    name: () => TAPi18n.__("Veto Power"),
    description: () => TAPi18n.__("When the fifth Fascist Policy is enacted, the Executive Branch gains the power to discard all three Policy tiles if both President and Chancellor agrees_ Each use of Veto will advance the Election Tracker by one_"),
    icon: "fa fa-gavel"
  },
};

export const FASCISTICONS = {
  3: [
    { id: 1, title: "", class: "" },
    { id: 2, title: () => TAPi18n.__("investigate loyalty"), class: "fa fa-user-secret" },
    { id: 3, title: () => TAPi18n.__("policy peek"), class: "fa fa-low-vision" },
    { id: 4, title: () => TAPi18n.__("execution"), class: "fa fa-bomb" },
    { id: 5, title: () => TAPi18n.__("final execution"), class: "fa fa-rocket" },
    { id: 6, title: "", class: "" },
  ],
  5: [
    { id: 1, title: "", class: "" },
    { id: 2, title: "", class: "" },
    { id: 3, title: () => TAPi18n.__("policy peek"), class: "fa fa-low-vision" },
    { id: 4, title: () => TAPi18n.__("execution"), class: "fa fa-bomb" },
    { id: 5, title: () => TAPi18n.__("final execution"), class: "fa fa-rocket" },
    { id: 6, title: "", class: "" },
  ],
  7: [
    { id: 1, title: "", class: "" },
    { id: 2, title: () => TAPi18n.__("investigate loyalty"), class: "fa fa-user-secret" },
    { id: 3, title: () => TAPi18n.__("call special election"), class: "fa fa-street-view" },
    { id: 4, title: () => TAPi18n.__("execution"), class: "fa fa-bomb" },
    { id: 5, title: () => TAPi18n.__("final execution"), class: "fa fa-rocket" },
    { id: 6, title: "", class: "" },
  ],
  9: [
    { id: 1, title: () => TAPi18n.__("investigate loyalty"), class: "fa fa-user-secret" },
    { id: 2, title: () => TAPi18n.__("investigate loyalty"), class: "fa fa-user-secret" },
    { id: 3, title: () => TAPi18n.__("call special election"), class: "fa fa-street-view" },
    { id: 4, title: () => TAPi18n.__("execution"), class: "fa fa-bomb" },
    { id: 5, title: () => TAPi18n.__("final execution"), class: "fa fa-rocket" },
    { id: 6, title: "", class: "" },
  ],
};

export const ROLECARDS = {
  // count, liberal, fascist, hitler
    2: {num: 2, liberal: 1, fascist: 0, hitler: 1},
    3: {num: 3, liberal: 2, fascist: 0, hitler: 1},
    4: {num: 4, liberal: 3, fascist: 0, hitler: 1},
    5: {num: 5, liberal: 3, fascist: 1, hitler: 1},
    6: {num: 6, liberal: 4, fascist: 1, hitler: 1},
    7: {num: 7, liberal: 4, fascist: 2, hitler: 1},
    8: {num: 8, liberal: 5, fascist: 2, hitler: 1},
    9: {num: 9, liberal: 5, fascist: 3, hitler: 1},
    10: {num: 10, liberal: 6, fascist: 3, hitler: 1}
};

// logic that resets election tracker
export function enactFromTracker() {
  let roomId = Session.get("roomId");
  let room = Rooms.findOne(roomId);
  if (room.electiontracker === 3) {
    let update = { electiontracker: 0 }
    if (room.trackerenact.topcard == "liberal") {
      update.liberal = room.liberal + 1;
    } else if (room.trackerenact.topcard == "fascist") {
      update.fascist = room.fascist + 1;
    }
    Rooms.update(roomId, { $set: update });
  }
  if (room.trackerenact.message != "") {
    FlashMessages.sendInfo(`${room.trackerenact.message}`);
  }
};
