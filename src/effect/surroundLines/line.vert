precision mediump float;

uniform float u_time;
uniform vec3 live_color;
uniform vec3 line_color;
uniform vec3 u_max;
uniform vec3 u_min;

varying vec3 v_color;
void main() {
    float new_time = mod(u_time * 0.1, 1.0);
    float rangeY = mix(u_min.y, u_max.y, new_time);

    if(rangeY < position.y && rangeY > position.y - 200.0) {
        v_color = live_color;

    } else {
        v_color = line_color;
    }

    // v_color = line_color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}