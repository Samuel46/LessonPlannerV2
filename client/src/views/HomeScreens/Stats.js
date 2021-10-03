import { Fragment, useContext } from "react";
import Chart from "react-apexcharts";
import Avatar from "@components/avatar";
import { MoreVertical } from "react-feather";
import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardHeader, CardTitle, CardBody, Media } from "reactstrap";
import { ThemeColors } from "@src/utility/context/ThemeColors";
import Moment from "react-moment";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const Stats = ({ trackBgColor, teachers, title, error, loading }) => {
  const [chatRef, setChatRef] = useState(null);
  const { colors } = useContext(ThemeColors);
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];
  const employeesTasks = [
    {
      chart: {
        type: "radialBar",
        series: [45],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
    {
      chart: {
        type: "radialBar",
        series: [65],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: [colors.info.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: "22%",
              },
              track: {
                background: trackBgColor,
              },
              dataLabels: {
                showOn: "always",
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: "round",
          },
        },
      },
    },
  ];

  //** Scroll to chat bottom
  const scrollToBottom = () => {
    chatRef.scrollTop = Number.MAX_SAFE_INTEGER;
  };

  useEffect(() => {
    if (chatRef !== null) {
      scrollToBottom();
    }
  }, [chatRef]);

  const renderTasks = () => {
    return (
      teachers &&
      teachers.data?.map((teacher) => {
        return (
          <div
            key={teacher && teacher._id}
            className="employee-task d-flex justify-content-between align-items-center"
          >
            <Media>
              <Avatar
                initials
                color={color}
                className="rounded mr-2 my-25"
                content={
                  (teacher && teacher.name) || (teacher && teacher.title)
                }
                imgHeight="40"
                imgWidth="40"
                status="online"
                contentStyles={{
                  borderRadius: 999999,
                  fontSize: "calc(20px)",
                  width: "100%",
                  height: "100%",
                }}
                style={{
                  height: "40px",
                  width: "40px",
                  borderRadius: 999999,
                }}
              />

              <Media className="my-auto" body>
                <h6 className="mb-0">{teacher.name || teacher.title}</h6>
                <small>
                  {(teacher && teacher.role) || (teacher && teacher.week)}
                </small>
              </Media>
            </Media>
            <div className="d-flex align-items-center">
              <small className="text-muted mr-75">
                <Moment format="YYYY/MM/DD">
                  {teacher && teacher.createdAt}
                </Moment>
              </small>
              {employeesTasks.map((task) => (
                <Chart
                  options={task.chart.options}
                  series={task.chart.series}
                  type={task.chart.type}
                  height={task.chart.height}
                  width={task.chart.width}
                />
              ))}
            </div>
          </div>
        );
      })
    );
  };

  return (
    <Card className="card-employee-task maxHeight">
      <CardHeader>
        <CardTitle tag="h4">{title}</CardTitle>

        <MoreVertical size={18} className="cursor-pointer" />
      </CardHeader>
      <PerfectScrollbar
        className="list-group todo-task-list-wrapper"
        options={{ wheelPropagation: true }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return { ...original, height: Math.floor(original.height) };
            };
          }
        }}
      >
        {error && error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <CardBody>{renderTasks()}</CardBody>
      </PerfectScrollbar>
    </Card>
  );
};

export default Stats;
