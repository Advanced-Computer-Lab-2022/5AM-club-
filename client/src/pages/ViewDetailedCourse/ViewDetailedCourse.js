import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import "./ViewDetailedCourse.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../layouts/PageWrapper/PageWrapper";

const timeConvert = (minutes) => {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  let time = "";
  if (hours !== 0) time += hours + " hr";
  if (minutes !== 0) time += minutes + "m";
  return time;
};

function ViewDetailedCourse(props) {
  const [course, setCourse] = React.useState({});
  const [subtitles, setSubtitles] = React.useState([]);
  const [open, setOpen] = React.useState({ array: [] });
  //const [country, setCountry] = React.useState(props.country);
  const navigate = useNavigate();
  React.useEffect(() => {
    console.log("started");

    axios
      .get("http://localhost:4000/courses/635bf46232ff1613410ffa0b") //uselocation front amr
      .then((response) => {
        setCourse(response.data);
        setSubtitles(response.data.subtitles);
        response.data.subtitles.forEach(() => {
          const updated = open.array;
          updated.push(false);
          setOpen({ array: updated });
          console.log(updated);
        });
      })
      .catch(() => {
        navigate("/error");
      });
  }, []);

  const showSections = (index) => {
    const updated = open.array;
    updated[index] = !updated[index];
    setOpen({ array: updated });
    console.log(open);
  };
  return (
    <PageWrapper>
      <Card border='dark' className='card'>
        <Card.Body>
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>
            <div>{course.summary}</div>
            <div className='attribute'>
              Total hours: {timeConvert(course.minutes)}
            </div>
            <div className='attribute'>Price: {course.price} </div>
          </Card.Text>

          <Button variant='outline-success'>BUY NOW</Button>
          <Card>
            <Card.Header>Subtitles</Card.Header>
            <ListGroup variant='flush'>
              {subtitles.map((subtitle, index) => (
                <ListGroup.Item>
                  {" "}
                  {subtitle.title} ( {timeConvert(subtitle.minutes)} )
                  <Button
                    className='right'
                    variant='outline-success'
                    onClick={() => {
                      showSections(index);
                    }}
                  >
                    {open.array[index] ? "🡡" : "🡣"}
                  </Button>
                  {open.array[index] === true ? (
                    <Card>
                      <Card.Header>Sections</Card.Header>
                      <ListGroup variant='flush'>
                        {subtitle.sections.map((section) => (
                          <ListGroup.Item>
                            {section.title} ( {timeConvert(section.minutes)} )
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card>
                  ) : null}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Card.Body>
      </Card>
    </PageWrapper>
  );
}

export default ViewDetailedCourse;
