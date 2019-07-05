import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { GET_DOCUMENTS } from "Actions/types";

import { getDocumentsSuccess, getDocumentsFailure } from "Actions";

const response = {
  data: [
    {
      id: 1,
      from: {
        name: "Mitchell Miles",
        avatar: "http://reactify.theironnetwork.org/data/images/user-1.jpg",
        email: "Mitchell@example.com"
      },
      email_labels: [1, 4],
      email_subject: "Compare Prices Find The Best Computer Accessory",
      email_content:
        "Etiam dignissim mauris turpis, vel pretium sem finibus ac. Nulla at erat et sem eleifend condimentum. Aliquam nec tortor sit amet sem pellentesque feugiat. Sed in dolor metus. In hendrerit pulvinar lectus, id sollicitudin ipsum eleifend at. Praesent ac facilisis risus. Phasellus semper faucibus dui id pharetra. Ut tempor ante in velit vehicula, vel porttitor lacus lobortis. Donec eget porta mauris. Maecenas id felis hendrerit, placerat purus et, iaculis ex. Suspendisse at felis consequat, tincidunt orci eget, laoreet elit. Morbi lacinia, enim vel porttitor viverra, magna urna bibendum dolor, tincidunt faucibus urna diam eget arcu.",
      received_time: "1 Hour Ago",
      badgeClass: "danger",
      starred: false,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Mitchell Miles"
    },
    {
      id: 3,
      from: {
        name: "Erin Jones",
        avatar: "http://reactify.theironnetwork.org/data/images/user-2.jpg",
        email: "Erin@example.com"
      },
      email_labels: [1, 4],
      email_subject: "Can You Get Free Games For Your Iphone",
      email_content:
        "Curabitur ac orci fermentum, sollicitudin neque sed, maximus neque. Ut sed purus massa. Aliquam erat volutpat. Aliquam eu leo facilisis massa aliquam pretium eu nec erat. Quisque odio neque, semper vel mi a, tempor tincidunt nulla. Cras at nisi cursus, volutpat lacus luctus, molestie ipsum. Etiam sed hendrerit leo.",
      received_time: "1 Mar",
      starred: true,
      selected: false,
      folder: 1,
      deleted: false,
      user_name: "Erin Jones"
    },
    {
      id: 4,
      from: {
        name: "Eli Erick",
        avatar: "",
        email: "Eli@example.com"
      },
      email_labels: [3],
      email_subject: "Compatible Inkjet Cartridge Which One Will You Choose",
      email_content:
        "Aenean erat ligula, semper tempus ligula in, scelerisque porttitor magna. Integer at porta erat. Donec eleifend tortor euismod posuere rutrum. Vivamus ultrices mattis dui, in luctus metus hendrerit vestibulum. Donec porttitor vel risus eget aliquam. Donec fringilla orci ligula, et finibus metus cursus at.",
      received_time: "1 Hour Ago",
      starred: false,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Eli Erick"
    },
    {
      id: 5,
      from: {
        name: "Virginia West",
        avatar: "",
        email: "Virginia@example.com"
      },
      email_labels: [3, 4],
      email_subject: "V7 Digital Photo Printing",
      email_content:
        "Aenean nec lacus vel massa volutpat pellentesque ut in lorem. Sed cursus, odio sit amet maximus pellentesque, nisl augue aliquet turpis, nec ornare felis dolor in orci. Duis id ipsum sagittis, convallis nisi non, vestibulum justo. Cras cursus ipsum eget est gravida, vitae sodales velit porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisl velit, pharetra vitae dui in, vehicula efficitur augue. Sed consectetur lorem quis nisi pretium, sed aliquam lacus feugiat.",
      received_time: "31 Mar",
      starred: true,
      selected: false,
      folder: 1,
      deleted: false,
      user_name: "Virginia West"
    },
    {
      id: 6,
      from: {
        name: "Jhon Doe",
        avatar: "http://reactify.theironnetwork.org/data/images/user-3.jpg",
        email: "Braden@example.com"
      },
      email_labels: [1, 4],
      email_subject: "WordPress Version 2 0 3 Review",
      email_content:
        "Maecenas pretium laoreet odio ac feugiat. Donec id elementum nisl, at dictum massa. Mauris porta vitae nulla non rutrum. Nulla semper a quam vel sollicitudin. Ut quis sodales lorem. Vestibulum suscipit tincidunt rutrum. Curabitur vel neque molestie, viverra nibh et, commodo turpis. Suspendisse finibus nunc et ligula placerat porttitor. Nullam urna ante, dignissim vitae semper quis, condimentum ut nibh. Nulla pharetra, eros eu efficitur congue, ",
      received_time: "13 Mar",
      starred: false,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Jhon Doe"
    },
    {
      id: 7,
      from: {
        name: "Michelle Warner",
        avatar: "http://reactify.theironnetwork.org/data/images/user-4.jpg",
        email: "Michelle@example.com"
      },
      email_labels: [2],
      email_subject: "Stu Unger Rise And Fall Of A Poker Genius",
      email_content:
        "semper sit amet dui. Sed lobortis nisi eu nisi malesuada, quis tincidunt leo euismod. Nullam convallis mauris at lacus sodales laoreet. Vestibulum bibendum felis vel metus dictum, vitae tristique felis ullamcorper. Praesent hendrerit sed ipsum ut congue. Quisque rhoncus semper massa, eu ullamcorper lacus maximus sed. Vivamus feugiat nisi a leo imperdiet tristique. Sed ultricies facilisis erat, ut maximus ex ultrices sit amet.",
      received_time: "1 Hour Ago",
      starred: false,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Mitchell Warner"
    },
    {
      id: 8,
      from: {
        name: "Jimmy Montgo",
        avatar: "",
        email: "Jimmy@example.com"
      },
      email_labels: [2, 3],
      email_subject: "Aliquam erat volutpat. Aliquam risus mi,",
      email_content:
        "Pellentesque elementum suscipit risus, sed varius velit vulputate et. Maecenas sed tortor vitae sapien sollicitudin convallis. Integer vulputate elementum finibus. Maecenas ac purus gravida, tempus diam tempor, elementum odio. Nulla eu tincidunt risus, quis condimentum odio. Integer hendrerit faucibus dolor id vestibulum",
      received_time: "1 Apr",
      starred: true,
      selected: false,
      folder: 2,
      deleted: false,
      user_name: "Jimmy Montgo"
    },
    {
      id: 9,
      from: {
        name: "Myles Snyder",
        avatar: "http://reactify.theironnetwork.org/data/images/user-5.jpg",
        email: "Myles@example.com"
      },
      email_labels: [1, 3],
      email_subject:
        "Mg Shadow Computer Monitoring Software A Watchdog Protecting Your Interests",
      email_content:
        "Fusce eleifend purus maximus, vestibulum magna a, eleifend ligula. Integer sit amet tristique ligula. Vivamus metus erat, condimentum id turpis ut, porta vulputate est. Fusce eleifend consectetur varius. Morbi ullamcorper eget risus pharetra faucibus. Aliquam sed nibh sodales, bibendum est quis, pulvinar odio. Sed vulputate diam quam, vel luctus ex commodo ut. Pellentesque iaculis urna at rutrum congue. Etiam est tortor, pulvinar id lacus vitae,",
      received_time: "1 Hour Ago",
      badgeClass: "danger",
      starred: false,
      selected: false,
      folder: 3,
      deleted: false,
      user_name: "Myles Snyder"
    },
    {
      id: 13465432132131,
      from: {
        name: "Shubham Raj",
        avatar: "",
        email: "shubham@example.com"
      },
      email_labels: [1, 4],
      email_subject: "Compatible Inkjet Cartridge",
      email_content:
        "Etiam dignissim mauris turpis, vel pretium sem finibus ac. Nulla at erat et sem eleifend condimentum. Aliquam nec tortor sit amet sem pellentesque feugiat. Sed in dolor metus. In hendrerit pulvinar lectus, id sollicitudin ipsum eleifend at. Praesent ac facilisis risus. Phasellus semper faucibus dui id pharetra. Ut tempor ante in velit vehicula, vel porttitor lacus lobortis. Donec eget porta mauris. Maecenas id felis hendrerit, placerat purus et, iaculis ex. Suspendisse at felis consequat, tincidunt orci eget, laoreet elit. Morbi lacinia, enim vel porttitor viverra, magna urna bibendum dolor, tincidunt faucibus urna diam eget arcu.",
      received_time: "1 Hour Ago",
      badgeClass: "danger",
      starred: true,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Shubham Raj"
    },
    {
      id: 9875441212312,
      from: {
        name: "Sukhpal Singh",
        avatar: "http://reactify.theironnetwork.org/data/images/user-6.jpg",
        email: "sukhpal@example.com"
      },
      email_labels: [1, 4],
      email_subject: "Ut tempor ante in velit vehicula, vel porttitor",
      email_content:
        "Etiam dignissim mauris turpis, vel pretium sem finibus ac. Nulla at erat et sem eleifend condimentum. Aliquam nec tortor sit amet sem pellentesque feugiat. Sed in dolor metus. In hendrerit pulvinar lectus, id sollicitudin ipsum eleifend at. Praesent ac facilisis risus. Phasellus semper faucibus dui id pharetra. Ut tempor ante in velit vehicula, vel porttitor lacus lobortis. Donec eget porta mauris. Maecenas id felis hendrerit, placerat purus et, iaculis ex. Suspendisse at felis consequat, tincidunt orci eget, laoreet elit. Morbi lacinia, enim vel porttitor viverra, magna urna bibendum dolor, tincidunt faucibus urna diam eget arcu.",
      received_time: "1 Hour Ago",
      badgeClass: "danger",
      starred: false,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Sukhpal Singh"
    },
    {
      id: 95656413121,
      from: {
        name: "Rukshana",
        avatar: "",
        email: "rukshana@example.com"
      },
      email_labels: [1, 4],
      email_subject:
        "A Discount Toner Cartridge Is Better Than Ever And You Will Save 50 Or More",
      email_content:
        "Magna urna bibendum dolor, tincidunt faucibus urna diam eget arcu. Etiam dignissim mauris turpis, vel pretium sem finibus ac. Nulla at erat et sem eleifend condimentum. Aliquam nec tortor sit amet sem pellentesque feugiat. Sed in dolor metus. In hendrerit pulvinar lectus, id sollicitudin ipsum eleifend at. Praesent ac facilisis risus. Phasellus semper faucibus dui id pharetra. Ut tempor ante in velit vehicula, vel porttitor lacus lobortis. Donec eget porta mauris. Maecenas id felis hendrerit, placerat purus et, iaculis ex. Suspendisse at felis consequat, tincidunt orci eget, laoreet elit. Morbi lacinia, enim vel porttitor viverra, magna urna bibendum dolor, tincidunt faucibus urna diam eget arcu.",
      received_time: "1 Hour Ago",
      badgeClass: "danger",
      starred: true,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Rukshana"
    },
    {
      id: 9875441212312,
      from: {
        name: "Shubham Raj",
        avatar: "http://reactify.theironnetwork.org/data/images/user-7.jpg",
        email: "shubham@example.com"
      },
      email_labels: [1, 4],
      email_subject: "Donec eget porta mauris. Maecenas id felis hendrerit,",
      email_content:
        "Tincidunt faucibus urna diam eget arcu Etiam dignissim mauris turpis, vel pretium sem finibus ac. Nulla at erat et sem eleifend condimentum. Aliquam nec tortor sit amet sem pellentesque feugiat. Sed in dolor metus. In hendrerit pulvinar lectus, id sollicitudin ipsum eleifend at. Praesent ac facilisis risus. Phasellus semper faucibus dui id pharetra. Ut tempor ante in velit vehicula, vel porttitor lacus lobortis. Donec eget porta mauris. Maecenas id felis hendrerit, placerat purus et, iaculis ex. Suspendisse at felis consequat, tincidunt orci eget, laoreet elit. Morbi lacinia, enim vel porttitor viverra, magna urna bibendum dolor, tincidunt faucibus urna diam eget arcu.",
      received_time: "4 Hour Ago",
      badgeClass: "danger",
      starred: true,
      selected: false,
      folder: 0,
      deleted: false,
      user_name: "Shubham Raj"
    }
  ]
};

const getDocumentsRequest = () => {
  return response;
};

function* getDocumentsFromServer() {
  try {
    const response = yield call(getDocumentsRequest);
    yield put(getDocumentsSuccess(response));
  } catch (error) {
    yield put(getDocumentsFailure(error));
  }
}

// wat
export function* getDocuments() {
  yield takeEvery(GET_DOCUMENTS, getDocumentsFromServer);
}

export default function* rootSaga() {
  yield all([fork(getDocuments)]);
}
