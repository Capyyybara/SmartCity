precision mediump float;
varying vec3 v_position;

uniform vec3 u_city_color;
uniform vec3 u_head_color;
uniform float u_size;
uniform vec3 u_up_color;
uniform float u_height;

void main() {
    vec3 base_color = u_city_color;

    base_color = mix(base_color, u_head_color, v_position.z / u_size);

    // 红色的移动灯带
    if(u_height > v_position.z && u_height < v_position.z + 3.0) {
        base_color = vec3(1.0, 0.0, 0.0);
    }
    gl_FragColor = vec4(base_color, 1.0);
}
