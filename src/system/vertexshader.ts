const baseHeader=`
        #define CAM_COMPENSATION_X 0.8
        #ifdef GL_ES
        precision mediump float;
        #endif
        uniform sampler2D u_texture;
        uniform vec2 u_resolution;
        uniform float u_time;`;

export const  VertexShader= {
    getPurple: function(){
        return VertexShader.getStaticFromglColor(
            'gl_FragColor = vec4(color * vec3(0.9, 0.0, 1.0), 1.0);'
            );
    },

    getDefault: function(){
        return VertexShader.getStaticFromglColor(
            'gl_FragColor = vec4(color, 1.0);'
        );
    },
    getYellow: function(){
        return VertexShader.getStaticFromglColor(
            'gl_FragColor = vec4(color * vec3(1.5, 1.5, 0.0), 1.0);'
        );
    },
    getHighContrast: function(){
        return VertexShader.getStaticFromglColor(
            'color = smoothstep(vec3(0.2), vec3(0.8), color); gl_FragColor = vec4(color, 1.0);'
        );
    },
    getInvert: function(){
        return VertexShader.getStaticFromglColor(
            'gl_FragColor = vec4(vec3(1.0) - color, 1.0);'
        );
    },
    
    getRave: function(){
        return VertexShader.getStaticFromglColor(
            'color += vec3(sin(4.5 * u_time), sin(3.1 * u_time + 1.0), sin(2.7 * u_time)); gl_FragColor = vec4(color, 1.0);'
        );
    },
    getStaticFromglColor: function(fragColor){
        return `
        ${baseHeader}
        void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            float x = gl_FragCoord.x;
            float y = gl_FragCoord.y;
            vec3 color = texture2D(u_texture, st).rgb;
            ${fragColor}
        }
        `
    }


}