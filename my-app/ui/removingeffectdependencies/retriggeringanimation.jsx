import { useState, useEffect, useRef } from "react";
import { useEffectEvent } from "react";

class FadeInAnimation {
	constructor(node) {
		this.node = node;
	}
	start(duration) {
		this.duration = duration;
		this.onProgress(0);
		this.startTime = performance.now();
		this.frameId = requestAnimationFrame(() => this.onFrame());
	}
	onFrame() {
		const timePassed = performance.now() - this.startTime;
		const progress = Math.min(timePassed / this.duration, 1);
		this.onProgress(progress);
		if (progress < 1) {
			// We still have more frames to paint
			this.frameId = requestAnimationFrame(() => this.onFrame());
		}
	}
	onProgress(progress) {
		this.node.style.opacity = progress;
	}
	stop() {
		cancelAnimationFrame(this.frameId);
		this.startTime = null;
		this.frameId = null;
		this.duration = 0;
	}
}

function Welcome({ duration }) {
	const ref = useRef(null);

	const onAppear = useEffectEvent((animation) => {
		animation.start(duration);
	});

	useEffect(() => {
		const animation = new FadeInAnimation(ref.current);
		onAppear(animation);
		return () => {
			animation.stop();
		};
	}, []);

	return (
		<h1
			ref={ref}
			style={{
				opacity: 0,
				color: "white",
				padding: 50,
				textAlign: "center",
				fontSize: 50,
				backgroundImage:
					"radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",
			}}
		>
			Welcome
		</h1>
	);
}

export default function AnimationReset() {
	const [duration, setDuration] = useState(1000);
	const [show, setShow] = useState(false);

	return (
		<>
			<label>
				<input
					type="range"
					min="100"
					max="3000"
					value={duration}
					onChange={(e) => setDuration(Number(e.target.value))}
				/>
				<br />
				Fade in duration: {duration} ms
			</label>
			<button onClick={() => setShow(!show)}>{show ? "Remove" : "Show"}</button>
			<hr />
			{show && <Welcome duration={duration} />}
		</>
	);
}
