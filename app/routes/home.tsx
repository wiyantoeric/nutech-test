import Welcome from '~/welcome/welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
    return [{ title: 'SIMS PPOB-Eric Wiyanto' }];
}

export default function Home() {
    return <Welcome />;
}
