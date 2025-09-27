import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    ServerIcon, 
    GlobeAltIcon, 
    UserGroupIcon, 
    ChartBarIcon 
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth, stats }) {
    const cards = [
        {
            name: 'Total Hosting Services',
            value: stats.hosting_services || 0,
            icon: ServerIcon,
            color: 'bg-blue-500',
        },
        {
            name: 'Total Tunneling Services',
            value: stats.tunneling_services || 0,
            icon: GlobeAltIcon,
            color: 'bg-green-500',
        },
        {
            name: 'Active Services',
            value: stats.active_services || 0,
            icon: ChartBarIcon,
            color: 'bg-purple-500',
        },
    ];

    if (auth.user.role === 'admin') {
        cards.push({
            name: 'Total Users',
            value: stats.total_users || 0,
            icon: UserGroupIcon,
            color: 'bg-orange-500',
        });
    }

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cards.map((card) => (
                    <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`${card.color} p-3 rounded-md`}>
                                        <card.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {card.name}
                                        </dt>
                                        <dd className="text-lg font-medium text-gray-900">
                                            {card.value}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Recent Activity
                        </h3>
                        <div className="text-sm text-gray-500">
                            No recent activity to display.
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                            Quick Actions
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <a
                                href="/hosting/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <ServerIcon className="h-5 w-5 mr-2" />
                                Add Hosting Service
                            </a>
                            <a
                                href="/tunneling/create"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                <GlobeAltIcon className="h-5 w-5 mr-2" />
                                Add Tunneling Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}