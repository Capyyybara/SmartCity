precision mediump float;
uniform float u_time;

varying vec3 v_position;

void main() {
    v_position = position;
    float rate = u_time;
    if(rate > 1.0) {
        rate = 1.0;
    }

    float z = v_position.z * rate;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, z, 1.0);
}