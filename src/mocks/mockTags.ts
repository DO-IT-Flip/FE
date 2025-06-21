import { Tag } from "../types/tag/index";

import Meal from "../components/Icon/tag/Meal.js";
import Sports from "../components/Icon/tag/Sports.js";
import Study from "../components/Icon/tag/Study.js";
import Coffee from "../components/Icon/tag/Coffee.js";
import Friends from "../components/Icon/tag/Friends.js";
import School from "../components/Icon/tag/School.js";
import Shopping from "../components/Icon/tag/Shopping.js";

export const mockTags: Tag[] = [
  {
    id: "tag1",
    name: "식사",
    color: "#FFA94D",
    colorName: "orange",
    iconComponent: Meal,
  },
  {
    id: "tag2",
    name: "운동",
    color: "#69DB7C",
    colorName: "green",
    iconComponent: Sports,
  },
  {
    id: "tag3",
    name: "공부",
    color: "#4DABF7",
    colorName: "blue",
    iconComponent: Study,
  },
  {
    id: "tag4",
    name: "카페",
    color: "#F783AC",
    colorName: "pink",
    iconComponent: Coffee,
  },
  {
    id: "tag5",
    name: "수업",
    color: "#9775FA",
    colorName: "purple",
    iconComponent: School,
  },
  {
    id: "tag6",
    name: "친구",
    color: "#FF6B6B",
    colorName: "red",
    iconComponent: Friends,
  },
  {
    id: "tag7",
    name: "장보기",
    color: "#38D9A9",
    colorName: "teal",
    iconComponent: Shopping,
  },
];
