type OwnProps = {
    size?: number;
};

export const SettingsIcon = ({ size }: OwnProps) => {
    return (
        <svg
            width={size || 32}
            height={size || 32}
            viewBox={`0 0 32 32`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.393 12.0194C15.5723 11.9383 14.7466 12.1129 14.029 12.5193C13.3114 12.9256 12.7369 13.5438 12.3842 14.2893C12.0315 15.0348 11.9178 15.871 12.0587 16.6836C12.1997 17.4962 12.5883 18.2453 13.1715 18.8284C13.7546 19.4116 14.5038 19.8002 15.3163 19.9412C16.1289 20.0821 16.9651 19.9684 17.7106 19.6157C18.4561 19.263 19.0743 18.6885 19.4806 17.9709C19.887 17.2533 20.0616 16.4276 19.9805 15.6069C19.8881 14.6869 19.4805 13.8271 18.8267 13.1733C18.1728 12.5194 17.3131 12.1118 16.393 12.0194ZM26.0243 16C26.0217 16.4348 25.9898 16.8689 25.9287 17.2994L28.7543 19.5156C28.8773 19.6176 28.9602 19.7599 28.9883 19.9173C29.0163 20.0746 28.9877 20.2368 28.9074 20.375L26.2343 25C26.1531 25.1369 26.0262 25.2407 25.876 25.2932C25.7257 25.3457 25.5618 25.3434 25.413 25.2869L22.6068 24.1569C22.452 24.0953 22.2844 24.073 22.1189 24.0921C21.9535 24.1112 21.7953 24.171 21.6587 24.2663C21.2304 24.5612 20.7803 24.8232 20.3124 25.05C20.1653 25.1215 20.0381 25.2281 19.9419 25.3605C19.8458 25.4928 19.7837 25.6467 19.7612 25.8088L19.3405 28.8019C19.3129 28.9599 19.2312 29.1035 19.1095 29.2081C18.9877 29.3126 18.8335 29.3716 18.673 29.375H13.3268C13.169 29.3723 13.0169 29.3159 12.8954 29.2151C12.774 29.1143 12.6905 28.9752 12.6587 28.8206L12.2387 25.8319C12.2151 25.6681 12.1514 25.5127 12.0533 25.3794C11.9551 25.2462 11.8256 25.1392 11.6762 25.0681C11.2088 24.8425 10.7603 24.5798 10.3349 24.2825C10.1987 24.1877 10.0411 24.1284 9.87623 24.1097C9.71137 24.091 9.54446 24.1137 9.39054 24.1756L6.58491 25.305C6.43623 25.3616 6.27234 25.364 6.1221 25.3116C5.97187 25.2592 5.84494 25.1555 5.76366 25.0187L3.09054 20.3937C3.01017 20.2556 2.98145 20.0934 3.00949 19.936C3.03753 19.7786 3.12051 19.6363 3.24366 19.5344L5.63179 17.6594C5.76262 17.5555 5.86545 17.4206 5.93094 17.267C5.99642 17.1133 6.02249 16.9457 6.00679 16.7794C5.98429 16.5188 5.97054 16.2588 5.97054 15.9981C5.97054 15.7375 5.98366 15.4812 6.00679 15.2262C6.02078 15.061 5.99343 14.8948 5.9272 14.7427C5.86097 14.5906 5.75795 14.4574 5.62741 14.355L3.24054 12.48C3.11939 12.3776 3.03815 12.2357 3.01107 12.0794C2.98399 11.9231 3.01278 11.7622 3.09241 11.625L5.76554 7C5.84672 6.86312 5.97361 6.75929 6.12385 6.7068C6.27409 6.65432 6.43803 6.65656 6.58679 6.71313L9.39304 7.84312C9.54779 7.90474 9.71541 7.927 9.88088 7.90791C10.0464 7.88883 10.2045 7.82898 10.3412 7.73375C10.7694 7.43883 11.2195 7.17682 11.6874 6.95C11.8345 6.8785 11.9618 6.77188 12.0579 6.63955C12.154 6.50722 12.2161 6.35326 12.2387 6.19125L12.6593 3.19812C12.6869 3.04005 12.7686 2.89648 12.8903 2.79194C13.0121 2.68741 13.1664 2.6284 13.3268 2.625H18.673C18.8308 2.62773 18.983 2.68413 19.1044 2.7849C19.2259 2.88567 19.3094 3.0248 19.3412 3.17937L19.7612 6.16813C19.7847 6.33192 19.8484 6.48734 19.9466 6.62059C20.0447 6.75383 20.1742 6.86076 20.3237 6.93188C20.791 7.15747 21.2396 7.42019 21.6649 7.7175C21.8011 7.81226 21.9587 7.87164 22.1236 7.8903C22.2885 7.90896 22.4554 7.8863 22.6093 7.82438L25.4149 6.695C25.5636 6.63838 25.7275 6.63605 25.8777 6.68841C26.028 6.74078 26.1549 6.84448 26.2362 6.98125L28.9093 11.6062C28.9897 11.7444 29.0184 11.9066 28.9903 12.064C28.9623 12.2214 28.8793 12.3637 28.7562 12.4656L26.368 14.3406C26.2366 14.4441 26.1332 14.5789 26.0672 14.7326C26.0011 14.8863 25.9746 15.054 25.9899 15.2206C26.0105 15.4794 26.0243 15.7394 26.0243 16Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
