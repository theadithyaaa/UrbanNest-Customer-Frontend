import { Routes } from '@angular/router';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListingsComponent } from './pages/listings/listings.component';
import { AgentComponent } from './pages/agent/agent.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';

export const routes: Routes = [
    {
        path: "",
        component: HeroPageComponent
    },
    {
        path: "navbar",
        component: NavbarComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "listings",
        component: ListingsComponent
    },
    {
        path: "agent",
        component: AgentComponent
    },
    {
        path: "aboutus",
        component: AboutusComponent
    }
];
