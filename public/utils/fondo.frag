#ifdef GL_ES
	precision mediump float;
	#endif

	uniform float time;

	uniform vec2 resolution;

	float length2(vec2 p) { return dot(p, p); }

	float noise(vec2 p){
		return fract(sin(fract(sin(p.x) * (323.13311)) + p.y) * 330.01011);
	}

	float worley(vec2 p) {
		float d = 1e30;
		for (int xo = -1; xo <= 1; ++xo) {
			for (int yo = -1; yo <= 1; ++yo) {
				vec2 tp = floor(p) + vec2(xo, yo);
				d = min(d, length2(p - tp - vec2(noise(tp))));
			}
		}
		return 1.5*exp(-3.0*abs(2.*d - .8));
	}

	float fworley(vec2 p) {
		return sqrt(sqrt(sqrt(
			.3 * // light
			worley(p*1.4 + 2.6 + time*.00002) *
			sqrt(worley(p * 35. + .2 + time * -0.0005)) * //last:movement
			sqrt(sqrt(worley(p * +.2 + 10.3))))));
	}

	void main() {
		vec2 uv = gl_FragCoord.xy / resolution.xy;
		float t = fworley(uv * resolution.xy / 1410.0);
		t *= exp(-length2(abs(1.*uv - .5)));
		gl_FragColor = vec4(t * vec3(0.4, 1.8*t, 1.7*t + pow(t, 1.6-t)), 1.0);
	}
