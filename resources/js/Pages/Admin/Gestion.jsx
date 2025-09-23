import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Gestion({ users, roles, auth }) {
    const { flash } = usePage().props;
    const [editingUser, setEditingUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState('');

    const updateUserRole = (userId) => {
        if (!selectedRole) return;

        router.patch(`/admin/users/${userId}/role`, {
            role_id: selectedRole
        }, {
            onSuccess: () => {
                setEditingUser(null);
                setSelectedRole('');
            }
        });
    };

    const deleteUser = (userId, userName) => {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ?`)) {
            router.delete(`/admin/users/${userId}`);
        }
    };

    const getRoleColor = (roleName) => {
        const colors = {
            'admin': 'bg-red-100 text-red-800',
            'webmaster': 'bg-purple-100 text-purple-800',
            'redacteur': 'bg-blue-100 text-blue-800',
            'user': 'bg-gray-100 text-gray-800',
        };
        return colors[roleName] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Gestion des Utilisateurs
                    </h2>
                    <Link
                        href={route('dashboard')}
                        className="bg-gradient-to-r from-orange-500 to-black hover:bg-gradient-to-r hover:from-black hover:to-orange-600  text-white font-bold py-2 px-4 rounded-xl"
                    >
                        Retour au Dashboard
                    </Link>
                </div>
            }
        >
            <Head title="Gestion des Utilisateurs" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Messages Flash */}
                 {flash?.success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {flash.error}
                    </div>
                )}

                    {/* Tableau des utilisateurs */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Utilisateur
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Rôle
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date d'inscription
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.first_name} {user.last_name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {editingUser === user.id ? (
                                                        <div className="flex items-center space-x-2">
                                                            <select
                                                                value={selectedRole}
                                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                                className="border border-gray-300 rounded px-3 py-1 text-sm"
                                                            >
                                                                <option value="">Sélectionner un rôle</option>
                                                                {roles.map((role) => (
                                                                    <option key={role.id} value={role.id}>
                                                                        {role.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <button
                                                                onClick={() => updateUserRole(user.id)}
                                                                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                                                            >
                                                                ✓
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setEditingUser(null);
                                                                    setSelectedRole('');
                                                                }}
                                                                className="bg-gray-500 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                                                            >
                                                                ✗
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role?.name)}`}>
                                                            {user.role?.name || 'Aucun rôle'}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {user.created_at}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingUser(user.id);
                                                                setSelectedRole(user.role?.id || '');
                                                            }}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Modifier rôle
                                                        </button>
                                                        {user.id !== auth.user.id && (
                                                            <button
                                                                onClick={() => deleteUser(user.id, `${user.first_name} ${user.last_name}`)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {users.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        Aucun utilisateur trouvé.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Statistiques */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-gray-900">{users.length}</div>
                            <div className="text-gray-500">Total utilisateurs</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-red-600">
                                {users.filter(u => u.role?.name === 'admin').length}
                            </div>
                            <div className="text-gray-500">Administrateurs</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-purple-600">
                                {users.filter(u => u.role?.name === 'webmaster').length}
                            </div>
                            <div className="text-gray-500">Webmasters</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="text-2xl font-bold text-blue-600">
                                {users.filter(u => u.role?.name === 'redacteur').length}
                            </div>
                            <div className="text-gray-500">Rédacteurs</div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}