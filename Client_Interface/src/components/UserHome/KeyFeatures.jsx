import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const highlights = [
  {
    title: 'ANPR Technology',
    desc: 'Utilizes advanced computer vision to capture and recognize vehicle plate numbers in real-time.',
    icon: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M434.863,126.093V77.137h-48.956V0h-33.391v77.137h-42.083V0h-33.391v77.137h-42.083V0h-33.391v77.137h-42.083V0h-33.391 v77.137H77.137v48.956H0v33.391h77.137v42.083H0v33.391h77.137v42.083H0v33.391h77.137v42.083H0v33.391h77.137v48.956h48.956V512 h33.391v-77.137h42.083V512h33.391v-77.137h42.083V512h33.391v-77.137h42.083V512h33.391v-77.137h48.956v-48.956H512v-33.391 h-77.137v-42.083H512v-33.391h-77.137v-42.083H512v-33.391h-77.137v-42.083H512v-33.39H434.863z M375.773,282.469 c0,23.125-14.251,42.974-34.428,51.253c-1.38,26.928-23.721,48.411-50.986,48.411c-13.221,0-25.283-5.052-34.36-13.325 c-9.077,8.273-21.139,13.325-34.36,13.325c-27.265,0-49.606-21.483-50.986-48.411c-20.177-8.28-34.428-28.129-34.428-51.253 c0-9.366,2.351-18.428,6.742-26.478c-4.296-7.867-6.742-16.883-6.742-26.459c0-22.913,14.194-42.903,34.426-51.239 c1.373-26.935,23.718-48.426,50.987-48.426c13.221,0,25.283,5.052,34.36,13.325c9.077-8.273,21.139-13.325,34.36-13.325 c27.27,0,49.615,21.491,50.987,48.426c20.234,8.336,34.426,28.326,34.426,51.239c0,9.577-2.445,18.593-6.742,26.459 C373.423,264.042,375.773,273.104,375.773,282.469z"></path> </g> </g> <g> <g> <path d="M221.64,163.258c-9.739,0-17.664,7.924-17.664,17.664c0,7.327,4.606,13.978,11.461,16.549l-11.727,31.264 c-9.613-3.606-17.688-9.991-23.463-18.021c-6.38,3.879-10.631,10.911-10.631,18.817c0,12.127,9.866,21.993,21.992,21.993v33.391 c-7.773,0-15.174-1.617-21.895-4.521c-0.065,0.687-0.098,1.379-0.098,2.076c0,12.127,9.865,21.992,21.992,21.992 c6.29,0,12.081-2.57,16.308-7.237l24.749,22.417c-7.484,8.263-17.258,13.992-27.914,16.604 c2.215,7.227,8.947,12.497,16.889,12.497c9.74,0,17.664-7.924,17.664-17.664V180.922 C239.304,171.182,231.381,163.258,221.64,163.258z"></path> </g> </g> <g> <g> <path d="M320.391,284.915v-33.391c12.127,0,21.993-9.866,21.993-21.993c0-7.907-4.251-14.939-10.631-18.817 c-5.774,8.031-13.85,14.415-23.463,18.021l-11.727-31.264c6.855-2.571,11.461-9.222,11.461-16.549 c0-9.74-7.924-17.664-17.664-17.664c-9.74,0-17.664,7.924-17.664,17.664v150.156c0,9.74,7.924,17.664,17.664,17.664 c7.943,0,14.673-5.271,16.889-12.497c-10.656-2.612-20.43-8.341-27.914-16.604l24.749-22.417 c4.226,4.667,10.018,7.237,16.307,7.237c12.127,0,21.993-9.866,21.993-21.992c0-0.697-0.033-1.389-0.098-2.076 C335.565,283.297,328.164,284.915,320.391,284.915z"></path> </g> </g> </g></svg>`,
  },
  {
    title: 'Real-time Parking Updates',
    desc: 'Provides live updates on available parking spaces, reducing time spent searching for parking.',
    icon: '<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 30 30" version="1.1" id="svg822" inkscape:version="0.92.4 (f8dce91, 2019-08-02)" sodipodi:docname="streaming.svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs id="defs816"></defs> <sodipodi:namedview id="base"  bordercolor="#666666" borderopacity="1.0" inkscape:pageopacity="0.0" inkscape:pageshadow="2" inkscape:zoom="17.833333" inkscape:cx="15" inkscape:cy="15" inkscape:document-units="px" inkscape:current-layer="layer1" showgrid="true" units="px" inkscape:window-width="1366" inkscape:window-height="713" inkscape:window-x="0" inkscape:window-y="0" inkscape:window-maximized="1" showguides="false" inkscape:guide-bbox="true"> <sodipodi:guide position="21.126168,22.794393" orientation="1,0" id="guide1575" inkscape:locked="false"></sodipodi:guide> <sodipodi:guide position="22.682243,23.285047" orientation="1,0" id="guide1635" inkscape:locked="false"></sodipodi:guide> <sodipodi:guide position="22.682243,7.6455921" orientation="0,1" id="guide1639" inkscape:locked="false"></sodipodi:guide> <sodipodi:guide position="18.859863,18.859863" orientation="1,0" id="guide1242" inkscape:locked="false"></sodipodi:guide> <inkscape:grid type="xygrid" id="grid1103"></inkscape:grid> </sodipodi:namedview> <metadata id="metadata819"> <rdf:rdf> <cc:work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type> <dc:title> </dc:title> </cc:work> </rdf:rdf> </metadata> <g inkscape:label="Layer 1" inkscape:groupmode="layer" id="layer1" transform="translate(0,-289.0625)"> <path style=";fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" d="M 6.5683594 6.5195312 C 4.3953064 8.6925812 3.0488281 11.69221 3.0488281 15 C 3.0488281 18.30779 4.3953064 21.307409 6.5683594 23.480469 L 7.9726562 22.076172 C 6.1644933 20.268012 5.0488281 17.76734 5.0488281 15 C 5.0488281 12.23266 6.1644932 9.7319881 7.9726562 7.9238281 L 6.5683594 6.5195312 z M 23.480469 6.5195312 L 22.076172 7.9238281 C 23.884335 9.7319919 25 12.232655 25 15 C 25 17.767345 23.884335 20.268008 22.076172 22.076172 L 23.480469 23.480469 C 25.653522 21.307415 27 18.307785 27 15 C 27 11.692215 25.653522 8.692585 23.480469 6.5195312 z M 8.6894531 8.640625 C 7.0592931 10.270785 6.0488281 12.52064 6.0488281 15 C 6.0488281 17.47936 7.0592931 19.729215 8.6894531 21.359375 L 10.09375 19.955078 C 8.8284801 18.689808 8.0488281 16.93892 8.0488281 15 C 8.0488281 13.06108 8.8284801 11.310192 10.09375 10.044922 L 8.6894531 8.640625 z M 21.359375 8.640625 L 19.955078 10.044922 C 21.220348 11.310192 22 13.06108 22 15 C 22 16.93892 21.220348 18.689808 19.955078 19.955078 L 21.359375 21.359375 C 22.989535 19.729215 24 17.47936 24 15 C 24 12.52064 22.989535 10.270785 21.359375 8.640625 z M 10.810547 10.761719 C 9.72328 11.848989 9.0488281 13.34907 9.0488281 15 C 9.0488281 16.65093 9.72328 18.151011 10.810547 19.238281 L 12.216797 17.832031 C 11.49442 17.109651 11.048828 16.11049 11.048828 15 C 11.048828 13.88951 11.49442 12.890349 12.216797 12.167969 L 10.810547 10.761719 z M 19.238281 10.761719 L 17.832031 12.167969 C 18.554408 12.890346 19 13.88951 19 15 C 19 16.11049 18.554408 17.109654 17.832031 17.832031 L 19.238281 19.238281 C 20.325548 18.151014 21 16.65093 21 15 C 21 13.34907 20.325548 11.848986 19.238281 10.761719 z M 15 13 A 2 2 0 0 0 13 15 A 2 2 0 0 0 15 17 A 2 2 0 0 0 17 15 A 2 2 0 0 0 15 13 z " transform="translate(0,289.0625)" id="rect858"></path> </g> </g></svg>',
  },
  {
    title: 'Auto Fee Calculation',
    desc: 'Automatically calculates parking fees based on the duration of stay, ensuring accurate and transparent billing.',
    icon: '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3"  fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M52.35,57.57H11.65v-50a.1.1,0,0,1,.16-.08l4.11,3.85a.12.12,0,0,0,.13,0l3.3-3.89a.09.09,0,0,1,.12,0l3.72,3.9a.11.11,0,0,0,.13,0l3.29-3.89a.09.09,0,0,1,.13,0l2.86,3.87a.11.11,0,0,0,.14,0L33,7.46a.09.09,0,0,1,.13,0l2.69,3.86a.1.1,0,0,0,.14,0l2.88-3.86a.1.1,0,0,1,.14,0l2.85,3.86a.1.1,0,0,0,.14,0L44.7,7.48a.09.09,0,0,1,.15,0l2.25,3.84a.11.11,0,0,0,.13,0l5-3.87a.1.1,0,0,1,.15.09Z" stroke-linecap="round"></path><line x1="19.42" y1="43.54" x2="46.02" y2="43.54" stroke-linecap="round"></line><line x1="19.42" y1="49.78" x2="46.02" y2="49.78" stroke-linecap="round"></line><path d="M27.28,19.25h2.35c2.3,0,4.84.76,4.84,4.26,0,3.8-3.22,5.25-6.64,4.86a.2.2,0,0,0-.16.34l7.26,7.81" stroke-linecap="round"></path><line x1="37.24" y1="19.25" x2="29.12" y2="19.25" stroke-linecap="round"></line><line x1="27.4" y1="23.63" x2="37.3" y2="23.63" stroke-linecap="round"></line></g></svg>',
  },
  {
    title: 'Parking Reservation',
    desc: 'Allows users to reserve parking spaces in advance, ensuring availability upon arrival.',
    icon: '<svg  version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-351 153 256 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M-223.4,158.8l-120.5,60.7v183.1h9.6V225.3l110.9-55.6l111,55.8v177.1h9.4V219.5L-223.4,158.8z M-149.7,303.5l-14.8-38.2 c-2.7-7.2-8.8-13.5-20.3-13.5h-20.9h-35.7h-21.1c-11.3,0-17.3,6.2-20.3,13.5l-14.8,38.2c-5.8,0.8-16.2,7.6-16.2,20.6v48.6h14.4v15.6 c0,19.1,27.1,19,27.1,0v-15.6h48.8h48.8v15.6c0,19,27.1,19.1,27.1,0v-15.6h14.4v-48.6C-133.5,311.1-143.8,304.1-149.7,303.5z M-285.5,343.4c-6.8,0-12.5-5.8-12.5-12.9c0-7,5.6-12.9,12.5-12.9c6.8,0,12.5,5.8,12.5,12.9C-273,337.6-278.5,343.4-285.5,343.4z M-223.7,303.1h-58.5l11.1-30.1c1.3-4.3,3.5-7.2,8.4-7.4h39h39c4.9,0,7,3.1,8.4,7.4l11.1,30.1H-223.7z M-161.7,343.4 c-6.8,0-12.5-5.8-12.5-12.9c0-7,5.6-12.9,12.5-12.9s12.5,5.8,12.5,12.9C-149.2,337.6-154.9,343.4-161.7,343.4z"></path> </g></svg>',
  },
]

const Highlights = () => {
  return (
    <div className="grid grid-cols-2  mt-8">
      {highlights.map((highlight, index) => (
        <TooltipProvider key={index}>
          <Tooltip >
            <TooltipTrigger className="py-5">
              <div className="mb-2 flex justify-center">
                <div
                  className="w-16 h-16 max-sm:w-12 max-sm:h-12 fill-foreground stroke-foreground rounded-full flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: highlight.icon }}
                ></div>
              </div>
              <div className="text-xl max-md:text-sm mb-2">
                <h3 className="font-bold text-center">{highlight.title}</h3>
              </div>
            </TooltipTrigger>
            <TooltipContent>{highlight.desc}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}

const KeyFeatures = () => {
  return (
    <div className=" bg-gray-100 dark:bg-[#1c1917] shadow-md border rounded-md py-6 mx-16 my-12">
      <div className="container mx-auto">
        <Highlights />

        
      </div>
    </div>
  )
}

export default KeyFeatures
