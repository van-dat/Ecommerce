module.exports = {
  content: ["./src/**/*.{html,js}", "./public/index.html"],
  theme: {
    extend: {
      width: {
        "w-header": "125px",
      },
      height: {
        header: "125px",
      },
      textColor: {
        main: "#070707",
        "main-100": "#de101d",
        "main-200": "#de0000",
        "main-300": "#dc0021",
      },
      borderColor: {
        main: "#ddd",
        btn: "#de101d",
        "btn-100": "#333",
        "main-100": "#222",
        "main-200": "#dc0021",
        "main-300": "#de0000",
      },
      backgroundColor: {
        btn: "rgba(222, 16, 29, 0.6)",
        modal: "rgba(127, 127, 127, 0.03)",
        header: "#f2f2f2",
        main: "#de0000",
        "main-100": "#de101d",
        content: "rgba(245,245,245,1)",
        hover: "rgba(0,0,0,0.7)",
        user: "rgba(255,255,255,0.3)",
        graydark: '#333A48',
        admin: "rgba(241, 245, 249, 1)"
      },
      screens: {
        1600: "1600px",
        tablet: "640px",
        950: "950px",
        laptop: "1024px",
      },
      transitionDuration: {
        2000: "2000ms",
      },
      keyframes: {
        "slide-top": {
          "0%": {
            "-webkit-transform": "translateY(100px);",
            transform: "translateY(100px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0px);",
            transform: "translateX(0px);",
          },
        },
        "zoom-img": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.2)",
            transform: "scale(1.2)",
          },
        },
        "zoom-img": {
          "0%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
          },
          "100%": {
            "-webkit-transform": "scale(1.2)",
            transform: "scale(1.2)",
          },
        },
        "user": {
          "0%": {
            "-webkit-transform": "scale(0)",
            transform: "scale(0)",
            opacity: 1
          },
          "100%": {
            "-webkit-transform": "scale(1)",
            transform: "scale(1)",
            opacity: 1
          }
        },
        "scale-up-center": {
          "0%":{
            "-webkit-transform": "scale(0.5);",
                    transform: "scale(0.5);"
          },
         " 100%" :{
            "-webkit-transform": "scale(1);",
                    transform: "scale(1);"
          }
        }



        // 

      },
      animation: {
        "slide-top": "slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "zoom-img": "zoom-img 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) NaNs infinite both",
        "user": "user 1s cubic-bezier(.25,.46,.45,.94) both;animation:scale-in-center .5s cubic-bezier(.25,.46,.45,.94) both",
        "zoom":"scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;"
      },
      flex: {
        6: "6 6 0%",
        4: "4 4 0%",
        5: "5 5 0%",
        7: "7 7 0%",
        3: "3 3 0%",
        2: "2 2 0%",
        8: "8 8 0%",
      },
    },
    container: {
      padding: "4rem",
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require('@tailwindcss/forms')
  ],
};
