import "./Error.css";
function Error() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="notfound-404">
            <h1 style={{ lineHeight: "null !important" }}>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </div>
          <p>
            Oops! How did you get here? The page you are looking for is
            unavailable. Click the button below to go back to the home page.
          </p>
          <a href="/">home page</a>
        </div>
      </div>
    </div>
  ); /* like this */
}
export default Error;
