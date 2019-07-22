import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Treebeard } from 'react-treebeard';

// const decorators = {
//     Loading: (props) => {
//         return (
//             <div style={props.style}>
//                 loading...
//             </div>
//         );
//     },
//     Toggle: (props) => {
//         return (
//             <div style={props.style}>
//                 <svg height={props.height} width={props.width}>
//                     // Vector Toggle Here
//                 </svg>
//             </div>
//         );
//     },
//     Header: (props) => {
//         return (
//             <div style={props.style}>
//                 {props.node.name}
//             </div>
//         );
//     },
//     Container: (props) => {
//         return (
//             <div onClick={this.props.onClick}>
//                 // Hide Toggle When Terminal Here
//                 <this.props.decorators.Toggle/>
//                 <this.props.decorators.Header/>
//             </div>
//         );
//     }
// };

const data = [
    {
      "id": "4640b911-33c3-a60a-6cea0244ea5f",
      "name": "Archive",
      "status": 0,
      "toggled":true,
      "documents": [{
        "id": "77dd-4f59-9499-b118146279fc",
        "name": "My Upload Document Archive",
        "description": "My uploaded document description Archive",
        "hasAttachment": false,
        "hasFormFields": false,
        "status": 0,
        "verificationResult": null,
        "locked": false,
        "isDeleted": false,
        tags: [
          'One',
          'two',
          'three'
        ],
        "lastAccessedOn": "2019-07-15T16:47:38",
        "documentFiles": [
          {
            "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
            "size": 3028.0,
            "pages": 2,
            "width": 612.0,
            "height": 792.0,
            "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
            "storageMedia": 0
          }
        ]
      }],
      "children": [
        {
          "id": "A-33c3-a60a-6cea0244ea5f",
          "name": "Sub Folder Archive",
          "status": 0,
          "documents": [{
            "id": "A-77dd-4f59-9499-b118146279fc",
            "name": "My Upload Document Archive Sub",
            "description": "My uploaded document description Archive",
            "hasAttachment": false,
            "hasFormFields": false,
            "status": 0,
            tags: [
              'One',
              'two',
              'three'
            ],
            "verificationResult": null,
            "locked": false,
            "isDeleted": false,
            "lastAccessedOn": "2019-07-15T16:47:38",
            "documentFiles": [
              {
                "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
                "size": 3028.0,
                "pages": 2,
                "width": 612.0,
                "height": 792.0,
                "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
                "storageMedia": 0
              }
            ]
          }],
          "children": [

          ]
        }
      ]
    },
    {
      "id": "8e53a257-01d8-4286-af2c-773649b81c0e",
      "name": "Inbox",
      "status": 0,
      "documents": [
        {
          "id": "a3dcfb1c-77dd-4f59-9499-b118146279fc",
          "name": "My Upload Document",
          "description": "My uploaded document description",
          "hasAttachment": false,
          "hasFormFields": false,
          "status": 0,
          tags: [
            'One',
            'two',
            'three'
          ],
          "verificationResult": null,
          "locked": false,
          "isDeleted": false,
          "lastAccessedOn": "2019-07-15T16:47:38",
          "documentFiles": [
            {
              "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
              "size": 3028.0,
              "pages": 2,
              "width": 612.0,
              "height": 792.0,
              "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
              "storageMedia": 0
            }
          ]
        },
        {
          "id": "a3dcfb1c-77dd-4f59-9499",
          "name": "My Upload Document2",
          "description": "My uploaded document description2",
          "hasAttachment": false,
          "hasFormFields": false,
          "status": 1,
          tags: [
            'One',
            'two',
            'three'
          ],
          "verificationResult": null,
          "locked": false,
          "isDeleted": false,
          "lastAccessedOn": "2019-07-15T16:47:38",
          "documentFiles": [
            {
              "id": "9608dc92-edb6-408c-8abe-a3882ea0d5c0",
              "size": 3028.0,
              "pages": 2,
              "width": 612.0,
              "height": 792.0,
              "path": "C:\\Users\\mkhan\\Documents\\signingdesk\\Code\\SigningDesk\\SigningDesk.Service\\data\\85e39610-6532-4fd6-b245-ec8d22f6374e\\a3dcfb1c-77dd-4f59-9499-b118146279fc\\9608dc92-edb6-408c-8abe-a3882ea0d5c0\\Smile More.pdf",
              "storageMedia": 0
            }
          ]
        }
      ],
      "children": [{
          "id": 23,
          "name":"test",
          "children" : []
      }]
    }
  ]

// const data = {
//     name: 'root',
//     id:1,
//     toggled: true,
//     children: [
//         {
//             name: 'parent',
//             id:2,
//             children: [
//                 { name: 'child1' },
//                 { name: 'child2' }
//             ]
//         },
//         {
//             name: 'loading parent',
//             id:3,
//             loading: true,
//             children: []
//         },
//         {
//             name: 'parent',
//             id:4,
//             children: [
//                 {
//                     name: 'nested parent',
//                     id:5, 
//                     children: [
//                         { name: 'nested child 1' },
//                         { name: 'nested child 2' }
//                     ]
//                 }
//             ]
//         }
//     ]
// };


class FolderMenu extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = { data   };
        this.onToggle = this.onToggle.bind(this);
    }
//: props.data
    onToggle(node, toggled){
        debugger;

        const { cursor, data } = this.state;
        if (cursor) {
            this.setState(() => ({ cursor, active: false }));
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState(() => ({ cursor: node, data: Object.assign({}, data) }));
    }

    render() {
        const { data } = this.state;
        return (
            <Treebeard
                data={data}
                onToggle={this.onToggle}
                //decorators={decorators}
            />
        );
    }
}

export default FolderMenu;