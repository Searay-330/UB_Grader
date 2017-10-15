import callApi from './../../../../util/apiCaller';

export function chooseCourse(data) {

    return { type: "course", coursesData: data };
}