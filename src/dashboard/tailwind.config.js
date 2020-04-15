module.exports = {
  theme: {
    // 👇 this makes Tailwind merge the configuration w/o overriding it.
    extend: {
      height: theme => ({
        "screen-0.8": "calc(100vh * 0.8)",
        "screen-0.7": "calc(100vh * 0.7)",
        "screen-0.6": "calc(100vh * 0.6)",
        "screen-0.5": "50vh",
        "screen-0.33": "calc(100vh / 3)",
        "screen-0.25": "calc(100vh / 4)",
        "screen-0.2": "calc(100vh / 5)",
        "graph": "450px",
        "map": "900px"
      }),
    },
  },
  variants: { display: ["responsive", "hover", "focus"] },
  plugins: [],
}
